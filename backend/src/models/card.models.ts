// src/models/card.models.ts

import { Schema, model, Document, Types } from 'mongoose';
import { ExecutionDataModel, ExecutionDataDocument } from './executionData.models';

export interface ICard extends Document {
    title: string;
    objective: string;
    prompt: string;
    generativeModel: string;
    context: string;
    previousCards: Types.ObjectId[]; // Array of previous card IDs
    nextCards: Types.ObjectId[]; // Array of next card IDs
    output: Types.ObjectId | ExecutionDataDocument | null;
    executed: boolean;
    evaluated: boolean;
    inconsistent: boolean;
    createdAt: Date;
    updatedAt: Date;
    getFormattedDetails: () => Promise<{ answer: string | null, prompt: string, context: string }>;
    linkCard: (cardId: Types.ObjectId, direction: 'next' | 'previous') => Promise<void>;
    unlinkCard: (cardId: Types.ObjectId, direction: 'next' | 'previous') => Promise<void>;
    getPreviousCardsOutputs: () => Promise<{ [key: string]: string | null }>;
}

const cardSchema = new Schema<ICard>(
    {
        title: { type: String, required: true },
        objective: { type: String, required: true },
        prompt: { type: String, required: true },
        generativeModel: { type: String, required: true },
        context: { type: String, required: false },
        previousCards: [{ type: Schema.Types.ObjectId, ref: 'Card' }], // Array of previous card IDs
        nextCards: [{ type: Schema.Types.ObjectId, ref: 'Card' }], // Array of next card IDs
        output: { type: Schema.Types.ObjectId, ref: 'ExecutionData', default: null },
        executed: { type: Boolean, default: false },
        evaluated: { type: Boolean, default: false },
        inconsistent: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

cardSchema.methods.getFormattedDetails = async function () {
    const card = this as ICard;
    const output = card.output ? await ExecutionDataModel.findById(card.output).exec() : null;

    const prompt = card.prompt;
    const context = card.context;

    const previousCardsOutputs = await card.getPreviousCardsOutputs();
    const contextWithPreviousOutputs = `${context}\n\n\n${Object.entries(previousCardsOutputs)
        .map(([key, value]) => `${value}`)
        .join('\n')}`;

    const answer = output ? output.generatedText : null;

    return { answer, prompt, context: contextWithPreviousOutputs };
};

cardSchema.methods.linkCard = async function (cardId: Types.ObjectId, direction: 'next' | 'previous') {
    const card = this as ICard;
    const relatedCard = await CardModel.findById(cardId);
    if (!relatedCard) throw new Error('Related card not found');

    if (direction === 'next' && !card.nextCards.includes(cardId)) {
        card.nextCards.push(cardId);
        if (!relatedCard.previousCards.includes(card._id)) {
            relatedCard.previousCards.push(card._id);
        }
    } else if (direction === 'previous' && !card.previousCards.includes(cardId)) {
        card.previousCards.push(cardId);
        if (!relatedCard.nextCards.includes(card._id)) {
            relatedCard.nextCards.push(card._id);
        }
    }

    await card.save();
    await relatedCard.save();
};

cardSchema.methods.unlinkCard = async function (cardId: Types.ObjectId, direction: 'next' | 'previous') {
    const card = this as ICard;
    const relatedCard = await CardModel.findById(cardId);
    if (!relatedCard) throw new Error('Related card not found');

    if (direction === 'next') {
        card.nextCards = card.nextCards.filter(id => !id.equals(cardId));
        relatedCard.previousCards = relatedCard.previousCards.filter(id => !id.equals(card._id));
    } else if (direction === 'previous') {
        card.previousCards = card.previousCards.filter(id => !id.equals(cardId));
        relatedCard.nextCards = relatedCard.nextCards.filter(id => !id.equals(card._id));
    }

    await card.save();
    await relatedCard.save();
};

cardSchema.methods.getPreviousCardsOutputs = async function () {
    const card = this as ICard;
    const previousCardsOutputs: { [key: string]: string | null } = {};

    for (const prevCardId of card.previousCards) {
        const prevCard = await CardModel.findById(prevCardId).populate('output');
        if (prevCard && prevCard.output) {
            const output = await ExecutionDataModel.findById(prevCard.output);
            previousCardsOutputs[prevCardId.toString()] = output?.generatedText || null;
        } else {
            previousCardsOutputs[prevCardId.toString()] = null;
        }
    }

    return previousCardsOutputs;
};

export const propagateInconsistency = async (cardId: Types.ObjectId): Promise<void> => {
    const card = await CardModel.findById(cardId);
    if (!card) return;

    for (const nextCardId of card.nextCards) {
        const nextCard = await CardModel.findById(nextCardId);
        if (nextCard && !nextCard.inconsistent) {
            nextCard.inconsistent = true;
            await nextCard.save();
        }
    }
};

cardSchema.pre('save', async function (next) {
    const card = this as ICard;

    console.log('pre save');

    if (card.isNew) {
        next();
        return;
    }

    // Check if any of the specified fields have been modified
    const fieldsToCheck = ['objective', 'prompt', 'context', 'generativeModel'];
    const isModified = fieldsToCheck.some(field => card.isModified(field));

    if (isModified) {
        card.output = null;
        card.executed = false;
        card.evaluated = false;
        card.inconsistent = true;
    }

    if (card.isModified('previousCards')) {
        card.inconsistent = true;
    }

    next();
});


cardSchema.post('save', async function () {
    const card = this as ICard;

    if (card.isModified('inconsistent') && card.inconsistent) {
        await propagateInconsistency(card._id);
    }
});

// Middleware to handle automatic unlinking of cards
cardSchema.pre('remove', async function (next) {
    const card = this as unknown as ICard;

    // Remove this card from the previous cards' nextCards
    for (const prevCardId of card.previousCards) {
        const prevCard = await CardModel.findById(prevCardId);
        if (prevCard) {
            prevCard.nextCards = prevCard.nextCards.filter(id => !id.equals(card._id));
            await prevCard.save();
        }
    }

    // Remove this card from the next cards' previousCards
    for (const nextCardId of card.nextCards) {
        const nextCard = await CardModel.findById(nextCardId);
        if (nextCard) {
            nextCard.previousCards = nextCard.previousCards.filter(id => !id.equals(card._id));
            await nextCard.save();
        }
    }

    next();
});

export const CardModel = model<ICard>('Card', cardSchema);
