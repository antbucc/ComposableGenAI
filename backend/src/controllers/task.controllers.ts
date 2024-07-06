// src/controllers/task.controllers.ts
import { Request, Response, NextFunction } from 'express';
import { TaskModel } from '../models/task.models';
import { CardModel, ICard } from '../models/card.models';
import { MilestoneModel } from '../models/milestone.models';
import mongoose, { Types } from 'mongoose';
import { generateTask } from '../services/task.services';

interface CreateTaskBody {
    name: string;
    objective: string;
    milestones?: string[];
    cards?: string[];
    generate?: boolean;
    generativeModel?: string;
}

export const createTask = async (req: Request<{}, any, CreateTaskBody>, res: Response, next: NextFunction) => {
    const { name, objective, milestones = [], cards = [], generate = false, generativeModel } = req.body;

    try {
        // Create the new task in the database
        const newTask = await TaskModel.create({
            name,
            objective,
            milestones: milestones.map(id => new Types.ObjectId(id)),
            cards: cards.map(id => new Types.ObjectId(id)),
        });

        if (generate && generativeModel) {
            // Call the generateTask function if generate is true
            const generatedData = await generateTask(newTask, generativeModel);

            // Debugging log
            console.log("Generated Data:", JSON.stringify(generatedData, null, 2));

            const generatedCards = generatedData?.cards;

            if (!Array.isArray(generatedCards)) {
                throw new Error("Invalid generated cards format");
            }

            const cardIds: Types.ObjectId[] = [];
            const cardMap: { [key: string]: ICard } = {};

            // Create and save all the generated cards
            for (const card of generatedCards) {
                const newCard = await CardModel.create({
                    title: card.title,
                    objective: card.objective,
                    prompt: card.prompt,
                    generativeModel,
                    context: card.context,
                    exampleOutput: card.exampleOutput,
                    previousCards: [],
                    nextCards: [],
                    output: null,
                    executed: false,
                    evaluated: false,
                    inconsistent: false,
                    plugins: [],
                });
                cardIds.push(newCard._id);
                cardMap[card.title] = newCard;
            }

            // Link cards based on dependencies
            for (const card of generatedCards) {
                const currentCard = cardMap[card.title];
                for (const dependency of card.dependencies) {
                    const dependentCard = cardMap[dependency];
                    if (dependentCard) {
                        await currentCard.linkCard(dependentCard._id, 'previous');
                    }
                }
            }

            // Add generated cards to the task
            newTask.cards.push(...cardIds);
            await newTask.save();
        }

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
