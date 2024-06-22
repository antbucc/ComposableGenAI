// ./src/controllers/executionData.controllers.ts

import { Request, Response, NextFunction } from 'express';
import { ExecutionDataModel, ExecutionDataDocument } from '../models/executionData.models';
import mongoose, { Types } from 'mongoose';

type CreateExecutionDataBody = Omit<ExecutionDataDocument, '_id'>;

// Define the type for changes
interface Changes {
    [key: string]: {
        old: any;
        new: any;
    };
}

export const createExecutionData = async (req: Request<{}, any, CreateExecutionDataBody>, res: Response, next: NextFunction) => {
    const executionData = req.body;

    try {
        const newExecutionData = await ExecutionDataModel.create(executionData);
        return res.status(201).json(newExecutionData);
    } catch (err) {
        next(err);
    }
};

export const getExecutionData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const executionData = await ExecutionDataModel.find();
        return res.status(200).json(executionData);
    } catch (err) {
        next(err);
    }
};

export const getExecutionDataById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const executionData = await ExecutionDataModel.findById(id);
        if (!executionData) {
            return res.status(404).json({ message: 'Execution Data not found' });
        }
        return res.status(200).json(executionData);
    } catch (err) {
        next(err);
    }
};

export const updateExecutionData = async (req: Request<{ id: string }, any, Partial<ExecutionDataDocument>>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const executionData = await ExecutionDataModel.findById(id);
        if (!executionData) {
            return res.status(404).json({ message: 'Execution Data not found' });
        }

        // Track changes
        const changes: Changes = {};
        (Object.keys(updates) as (keyof ExecutionDataDocument)[]).forEach((key) => {
            if (executionData[key] !== updates[key]) {
                changes[key] = {
                    old: executionData[key],
                    new: updates[key]
                };
            }
        });

        // Update execution data
        Object.assign(executionData, updates);
        await executionData.save();


        return res.status(200).json(executionData);
    } catch (err) {
        next(err);
    }
};

export const deleteExecutionData = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const executionData = await ExecutionDataModel.findByIdAndDelete(id);
        if (!executionData) {
            return res.status(404).json({ message: 'Execution Data not found' });
        }
        return res.status(200).json(executionData);
    } catch (err) {
        next(err);
    }
};
