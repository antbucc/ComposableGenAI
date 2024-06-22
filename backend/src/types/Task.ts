// ./src/types/Task.ts

export type Task = {
    _id: string;
    name: string;
    objective: string;
    milestones: string[];
    cards: string[];
    createdAt: Date;
    updatedAt: Date;
};
