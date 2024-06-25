// src/controllers/card.controllers.ts

import { Request, Response, NextFunction } from 'express';
import { CardModel, ICard, propagateInconsistency } from '../models/card.models';
import { ExecutionDataModel, ExecutionDataDocument } from '../models/executionData.models';
import { TaskModel } from '../models/task.models';
import { executeCard } from '../services/execution.services';
import { evaluateCardOutput } from '../services/evaluation.services';
import { EvaluationMetricType, EvaluationMetricDefinition } from '../types';
import { Types } from 'mongoose';

type CreateCardBody = Omit<ICard, '_id'> & {
    execute?: boolean;
    evaluate?: boolean;
    taskId?: string;
    previousCards?: string[];
};

const executeAndSaveCard = async (card: ICard): Promise<ExecutionDataDocument> => {
    const { generatedText } = await executeCard(card);
    const executionData = new ExecutionDataModel({
        generatedText,
        evaluationMetrics: [],
    });
    await executionData.save();
    card.output = executionData._id;
    card.executed = true;
    await card.save();
    return executionData;
};

const evaluateAndSaveCard = async (card: ICard, executionData: ExecutionDataDocument) => {
    const evaluationResults = await evaluateCardOutput(card._id.toString());

    executionData.evaluationMetrics = [
        { type: EvaluationMetricType.COHERENCE, evaluationDescription: EvaluationMetricDefinition.COHERENCE, evaluationResult: evaluationResults.coherence_score },
        { type: EvaluationMetricType.RELEVANCE, evaluationDescription: EvaluationMetricDefinition.RELEVANCE, evaluationResult: evaluationResults.relevance_score },
        { type: EvaluationMetricType.FLUENCY, evaluationDescription: EvaluationMetricDefinition.FLUENCY, evaluationResult: evaluationResults.fluency_score },
        { type: EvaluationMetricType.GROUNDEDNESS, evaluationDescription: EvaluationMetricDefinition.GROUNDEDNESS, evaluationResult: evaluationResults.groundedness_score },
        {
            type: EvaluationMetricType.AVERAGE, evaluationDescription: EvaluationMetricDefinition.AVERAGE,
            evaluationResult: (evaluationResults.relevance_score + evaluationResults.groundedness_score + evaluationResults.coherence_score + evaluationResults.fluency_score) / 4,
        },
    ];

    await executionData.save();
    card.evaluated = true;
    await card.save();
};

export const createCard = async (req: Request<{}, any, CreateCardBody>, res: Response, next: NextFunction) => {
    const { taskId, ...card } = req.body;
    const { execute = 'false', evaluate = execute } = req.query;

    try {
        const newCard = new CardModel({
            ...card,
            previousCards: [],
            nextCards: [],
            output: null,
            executed: false,
            evaluated: false,
            inconsistentState: false
        });

        await newCard.save();

        if (taskId) {
            const task = await TaskModel.findById(taskId);
            if (task) {
                task.cards.push(newCard._id);
                await task.save();
            }
        }

        let output: ExecutionDataDocument | null = null;
        if (execute === 'true') {
            output = await executeAndSaveCard(newCard);
        }

        if (evaluate === 'true' && output) {
            await evaluateAndSaveCard(newCard, output);
        }

        const populatedCard = await CardModel.findById(newCard._id);
        return res.status(201).json(populatedCard);
    } catch (err) {
        next(err);
    }
};

export const executeCardController = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { evaluate = 'true' } = req.query;

    try {
        const card = await CardModel.findById(new Types.ObjectId(id));
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const output = await executeAndSaveCard(card);
        if (evaluate === 'true') {
            await evaluateAndSaveCard(card, output);
        }
        card.inconsistent = false;
        propagateInconsistency(card._id);
        await card.save();
        return res.status(200).json(output);
    } catch (err) {
        next(err);
    }
};

export const evaluateCardById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const card = await CardModel.findById(new Types.ObjectId(id));
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        if (!card.output) {
            return res.status(400).json({ message: 'Card has no output to evaluate' });
        }

        const output = await ExecutionDataModel.findById(card.output);
        if (!output) {
            return res.status(404).json({ message: 'Output not found' });
        }

        await evaluateAndSaveCard(card, output);
        card.inconsistent = false;
        await card.save();
        return res.status(200).json(output);
    } catch (err) {
        next(err);
    }
};

export const setNextCard = async (req: Request<{ currentCardId: string }, any, { nextCardIds: string[] }>, res: Response, next: NextFunction) => {
    const { currentCardId } = req.params;
    const { nextCardIds } = req.body;

    try {
        const currentCard = await CardModel.findById(new Types.ObjectId(currentCardId));
        if (!currentCard) {
            return res.status(404).json({ message: 'Current card not found' });
        }

        for (const nextCardId of nextCardIds) {
            await currentCard.linkCard(new Types.ObjectId(nextCardId), 'next');
        }

        const updatedCard = await CardModel.findById(currentCardId);
        return res.status(200).json(updatedCard);
    } catch (err) {
        next(err);
    }
};

export const setPreviousCard = async (req: Request<{ currentCardId: string }, any, { previousCardIds: string[] }>, res: Response, next: NextFunction) => {
    const { currentCardId } = req.params;
    const { previousCardIds } = req.body;

    try {
        const currentCard = await CardModel.findById(new Types.ObjectId(currentCardId));
        if (!currentCard) {
            return res.status(404).json({ message: 'Current card not found' });
        }

        for (const previousCardId of previousCardIds) {
            await currentCard.linkCard(new Types.ObjectId(previousCardId), 'previous');
        }

        const updatedCard = await CardModel.findById(currentCardId);
        return res.status(200).json(updatedCard);
    } catch (err) {
        next(err);
    }
};


export const removeNextCard = async (req: Request<{ currentCardId: string }, any, { nextCardId: string }>, res: Response, next: NextFunction) => {
    const { currentCardId } = req.params;
    const { nextCardId } = req.body;

    try {
        const currentCard = await CardModel.findById(new Types.ObjectId(currentCardId));
        if (!currentCard) {
            return res.status(404).json({ message: 'Current card not found' });
        }

        await currentCard.unlinkCard(new Types.ObjectId(nextCardId), 'next');
        const nextCard = await CardModel.findById(nextCardId);
        return res.status(200).json({ currentCard, nextCard });
    } catch (err) {
        next(err);
    }
};

export const removePreviousCard = async (req: Request<{ currentCardId: string }, any, { previousCardId: string }>, res: Response, next: NextFunction) => {
    const { currentCardId } = req.params;
    const { previousCardId } = req.body;

    try {
        const currentCard = await CardModel.findById(new Types.ObjectId(currentCardId));
        if (!currentCard) {
            return res.status(404).json({ message: 'Current card not found' });
        }

        await currentCard.unlinkCard(new Types.ObjectId(previousCardId), 'previous');
        const previousCard = await CardModel.findById(previousCardId);
        return res.status(200).json({ currentCard, previousCard });
    } catch (err) {
        next(err);
    }
};

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cards = await CardModel.find();
        return res.status(200).json(cards);
    } catch (err) {
        next(err);
    }
};

export const getCardsWithoutPopulate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cards = await CardModel.find();
        return res.status(200).json(cards);
    } catch (err) {
        next(err);
    }
};

export const deleteCardById = async (req: Request<{ id: string }, any, { taskId?: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { taskId } = req.body;

    try {
        const card = await CardModel.findById(new Types.ObjectId(id));
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Unlink from previous cards
        for (const prevCardId of card.previousCards) {
            const prevCard = await CardModel.findById(prevCardId);
            if (prevCard) {
                await prevCard.unlinkCard(card._id, 'next');
            }
        }

        // Unlink from next cards
        for (const nextCardId of card.nextCards) {
            const nextCard = await CardModel.findById(nextCardId);
            if (nextCard) {
                await nextCard.unlinkCard(card._id, 'previous');
            }
        }

        // Remove the card from its task if taskId is specified
        if (taskId) {
            const task = await TaskModel.findById(taskId);
            if (task) {
                task.cards = task.cards.filter(taskCardId => !taskCardId.equals(card._id));
                await task.save();
            }
        }

        await CardModel.findByIdAndDelete(id);
        return res.status(204).end();
    } catch (err) {
        next(err);
    }
};




export const deleteAllCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CardModel.deleteMany({});
        return res.status(204).end();
    } catch (err) {
        next(err);
    }
};

export const getCardById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const card = await CardModel.findById(new Types.ObjectId(id)).populate('output');
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        return res.status(200).json(card);
    } catch (err) {
        next(err);
    }
};

export const getPreviousCardsOutputsController = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const card = await CardModel.findById(new Types.ObjectId(id));
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const previousCardsOutputs = await card.getPreviousCardsOutputs();
        return res.status(200).json(previousCardsOutputs);
    } catch (err) {
        next(err);
    }
};

export const updateCard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, objective, prompt, context, inconsistent } = req.body;
    console.log()

    try {
        const card = await CardModel.findById(new Types.ObjectId(id));

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        //keep it as it is because it is needed to detect card modifications
        card.title = title;
        card.objective = objective;
        card.prompt = prompt;
        card.context = context;
        card.inconsistent = inconsistent;

        await card.save();

        res.status(200).json(card);
    } catch (error) {
        console.error(`Error updating card with id ${id}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};