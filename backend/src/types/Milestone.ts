// ./src/types/Milestone.ts

export type Milestone = {
    _id: string;
    name: string;
    description: string;
    cards: string[];  // Use string[] for references
    previousMilestone?: string;
    nextMilestone?: string;
    createdAt: Date;
    updatedAt: Date;
};
