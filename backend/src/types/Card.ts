// ./src/types/Card.ts
export type Card = {
    _id: string;
    title: string;
    objective: string;
    prompt: string;
    generativeModel: string;
    context: string;
    previousCards: Map<string, string>; // Map of previous card ID to title
    nextCards: Map<string, string>; // Map of next card ID to title
    executed: boolean; // New field for execution status
    evaluated: boolean; // New field for evaluation status
    inconsistentState: boolean; // New field for inconsistent state
    createdAt: Date;
    updatedAt: Date;
};
