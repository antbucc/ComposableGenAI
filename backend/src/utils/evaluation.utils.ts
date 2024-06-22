//src/evaluatui.utils.ts
export interface EvaluationInput {
    answer: string;
    context: string;
    question: string;
}

export interface EvaluationOutput {
    relevance_score: number;
    groundedness_score: number;
    coherence_score: number;
    fluency_score: number;
}
