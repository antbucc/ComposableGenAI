// ./src/models/executionData.models.ts

import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { EvaluationMetricType, EvaluationMetricDefinition } from '../types/EvaluationMetric';

export interface EvaluationMetric {
    type: EvaluationMetricType;
    evaluationDescription: string;
    evaluationResult: number;
}

export interface ExecutionDataDocument extends Document {
    generatedText?: string; // Optional field
    evaluationMetrics: EvaluationMetric[];
    createdAt: Date;
    updatedAt: Date;
}

const evaluationMetricSchema = new Schema<EvaluationMetric>({
    type: {
        type: String,
        required: true,
        enum: Object.values(EvaluationMetricType),
        default: EvaluationMetricType.COHERENCE
    },
    evaluationDescription: {
        type: String,
        required: true,
        enum: Object.values(EvaluationMetricDefinition)
    },
    evaluationResult: {
        type: Number,
        required: true
    }
});

const executionDataSchema = new Schema<ExecutionDataDocument>(
    {
        generatedText: {
            type: String,
            required: false,
        },
        evaluationMetrics: [evaluationMetricSchema],
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields
    }
);

export const ExecutionDataModel = model<ExecutionDataDocument>('ExecutionData', executionDataSchema);
