// ./src/models/milestone.models.ts

import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IMilestone extends Document {
    name: string;
    description: string;
    cards: Types.ObjectId[];
    previousMilestone?: Types.ObjectId; // The milestone immediately preceding this one
    nextMilestone?: Types.ObjectId; // The milestone immediately following this one
    createdAt: Date;
    updatedAt: Date;
}

const milestoneSchema = new Schema<IMilestone>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
        previousMilestone: { type: Schema.Types.ObjectId, ref: 'Milestone', default: null }, // Previous milestone in sequence
        nextMilestone: { type: Schema.Types.ObjectId, ref: 'Milestone', default: null }, // Next milestone in sequence
    },
    {
        timestamps: true,
    }
);

export const MilestoneModel = model<IMilestone>('Milestone', milestoneSchema);
