// ./src/types/ExecutionData.ts
import { EvaluationMetric } from './EvaluationMetric';

export type ExecutionData = {
    _id: string;
    generatedText?: string; // Optional field
    evaluationMetrics: EvaluationMetric[];
    createdAt: Date;
    updatedAt: Date;
};
