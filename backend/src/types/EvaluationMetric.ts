// src/types/EvaluationMetric.ts

export enum EvaluationMetricType {
    COHERENCE = 'Coherence',
    RELEVANCE = 'Relevance',
    FLUENCY = 'Fluency',
    GROUNDEDNESS = 'Groundedness',
    AVERAGE = 'Average'
}

export enum EvaluationMetricDefinition {
    COHERENCE = 'Logical and consistent flow of sentences.',
    RELEVANCE = 'Pertinence to the given input or query.',
    FLUENCY = 'Grammatical accuracy and appropriate vocabulary.',
    GROUNDEDNESS = 'Alignment with provided source data.',
    AVERAGE = 'The average score of all evaluation criteria.'
}

export type EvaluationMetric = {
    _id: string;
    type: EvaluationMetricType;
    evaluationDescription: string;
    evaluationResult: number;
};
