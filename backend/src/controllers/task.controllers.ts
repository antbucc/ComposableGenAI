// src/controllers/task.controllers.ts
import { Request, Response, NextFunction } from 'express';
import { TaskModel } from '../models/task.models';
import { CardModel } from '../models/card.models';
import { MilestoneModel } from '../models/milestone.models';
import mongoose, { Types } from 'mongoose';

type CreateTaskBody = {
    name: string;
    objective: string;
    milestones?: string[];
    cards?: string[];
};

export const createTask = async (req: Request<{}, any, CreateTaskBody>, res: Response, next: NextFunction) => {
    const { name, objective, milestones = [], cards = [] } = req.body;

    try {
        const newTask = await TaskModel.create({
            name,
            objective,
            milestones: milestones.map(id => new Types.ObjectId(id)),
            cards: cards.map(id => new Types.ObjectId(id)),
        });

        return res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await TaskModel.find();
        return res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

export const addMilestonesToTask = async (req: Request<{ id: string }, any, { milestoneIds: string[] }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { milestoneIds } = req.body;

    try {
        const task = await TaskModel.findById(new Types.ObjectId(id));
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.milestones.push(...milestoneIds.map(id => new Types.ObjectId(id)));
        await task.save();

        return res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

export const removeMilestonesFromTask = async (req: Request<{ id: string }, any, { milestoneIds: string[] }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { milestoneIds } = req.body;

    try {
        const task = await TaskModel.findById(new Types.ObjectId(id));
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.milestones = task.milestones.filter(milestoneId => !milestoneIds.includes(milestoneId.toHexString()));
        await task.save();

        return res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

export const addCardsToTask = async (req: Request<{ id: string }, any, { cardIds: string[] }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { cardIds } = req.body;

    try {
        const task = await TaskModel.findById(new Types.ObjectId(id));
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.cards.push(...cardIds.map(id => new Types.ObjectId(id)));
        await task.save();

        return res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

export const removeCardsFromTask = async (req: Request<{ id: string }, any, { cardIds: string[] }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { cardIds } = req.body;

    try {
        const task = await TaskModel.findById(new Types.ObjectId(id));
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.cards = task.cards.filter(cardId => !cardIds.includes(cardId.toHexString()));
        await task.save();

        return res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

export const getTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const task = await TaskModel.findById(new Types.ObjectId(id)).populate('milestones cards');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req: Request<{ id: string }, any, CreateTaskBody>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, objective, milestones = [], cards = [] } = req.body;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, {
            name,
            objective,
            milestones: milestones.map(id => new Types.ObjectId(id)),
            cards: cards.map(id => new Types.ObjectId(id)),

        }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const task = await TaskModel.findByIdAndDelete(new Types.ObjectId(id));
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

export const getTaskMilestones = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const task = await TaskModel.findById(new Types.ObjectId(id)).populate('milestones');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(task.milestones);
    } catch (err) {
        next(err);
    }
};

export const getTaskCards = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const task = await TaskModel.findById(new Types.ObjectId(id)).populate('cards');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const milestones = await MilestoneModel.find({ _id: { $in: task.milestones } }).populate('cards');
        const milestoneCards = milestones.reduce((acc, milestone) => {
            acc.push(...milestone.cards);
            return acc;
        }, [] as Types.ObjectId[]);

        const allCards = [...task.cards, ...milestoneCards];

        return res.status(200).json(allCards);
    } catch (err) {
        next(err);
    }
};

// Delete all tasks
export const deleteAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await TaskModel.find();
        await TaskModel.deleteMany({});
        await CardModel.updateMany(
            { tasks: { $in: tasks.map(task => task._id) } },
            { $pull: { tasks: { $in: tasks.map(task => task._id) } } }
        );
        await MilestoneModel.updateMany(
            { tasks: { $in: tasks.map(task => task._id) } },
            { $pull: { tasks: { $in: tasks.map(task => task._id) } } }
        );
        return res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};
