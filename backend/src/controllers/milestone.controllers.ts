// ./src/controllers/milestone.controllers.ts

import { Request, Response, NextFunction } from 'express';
import { MilestoneModel } from '../models/milestone.models';
import mongoose, { Types } from 'mongoose';

type CreateMilestoneBody = {
    name: string;
    description: string;
    cards: string[];
    previousMilestone?: string;
    nextMilestone?: string;
};

export const createMilestone = async (req: Request<{}, any, CreateMilestoneBody>, res: Response, next: NextFunction) => {
    const milestone = req.body;

    try {
        const newMilestone = await MilestoneModel.create({
            ...milestone,
            cards: milestone.cards.map(id => new mongoose.Types.ObjectId(id))
        });
        return res.status(201).json(newMilestone);
    } catch (err) {
        next(err);
    }
};

export const getMilestones = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const milestones = await MilestoneModel.find().populate('cards');
        return res.status(200).json(milestones);
    } catch (err) {
        next(err);
    }
};

export const addCardsToMilestone = async (req: Request<{ id: string }, any, { cardIds: string[] }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { cardIds } = req.body;

    try {
        const milestone = await MilestoneModel.findById(new Types.ObjectId(id));
        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }

        milestone.cards.push(...cardIds.map(id => new mongoose.Types.ObjectId(id)));
        await milestone.save();

        return res.status(200).json(milestone);
    } catch (err) {
        next(err);
    }
};

export const removeCardsFromMilestone = async (req: Request<{ id: string }, any, { cardIds: string[] }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { cardIds } = req.body;

    try {
        const milestone = await MilestoneModel.findById(new Types.ObjectId(id));
        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }

        milestone.cards = milestone.cards.filter(cardId => !cardIds.includes(cardId.toHexString()));
        await milestone.save();

        return res.status(200).json(milestone);
    } catch (err) {
        next(err);
    }
};

export const getMilestone = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const milestone = await MilestoneModel.findById(new Types.ObjectId(id)).populate('cards');
        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }
        return res.status(200).json(milestone);
    } catch (err) {
        next(err);
    }
};

export const updateMilestone = async (req: Request<{ id: string }, any, CreateMilestoneBody>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const milestone = req.body;

    try {
        const updatedMilestone = await MilestoneModel.findByIdAndUpdate(id, {
            ...milestone,
            cards: milestone.cards.map(id => new mongoose.Types.ObjectId(id))
        }, { new: true });
        if (!updatedMilestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }
        return res.status(200).json(updatedMilestone);
    } catch (err) {
        next(err);
    }
};

export const deleteMilestone = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const milestone = await MilestoneModel.findByIdAndDelete(new Types.ObjectId(id));
        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }
        return res.status(200).json(milestone);
    } catch (err) {
        next(err);
    }
};

export const getMilestoneCards = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const milestone = await MilestoneModel.findById(new Types.ObjectId(id)).populate('cards');
        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }
        return res.status(200).json(milestone.cards);
    } catch (err) {
        next(err);
    }
};
