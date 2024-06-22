// src/models/task.models.ts

import { Schema, model, Document, Types } from 'mongoose';

export interface ITask extends Document {
    name: string;
    objective: string;
    milestones: Types.ObjectId[];
    cards: Types.ObjectId[]; // Direct card associations
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        name: { type: String, required: true },
        objective: { type: String, required: true },
        milestones: [{ type: Schema.Types.ObjectId, ref: 'Milestone' }],
        cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }], // Direct card associations
    },
    {
        timestamps: true,
    }
);

export const TaskModel = model<ITask>('Task', taskSchema);
