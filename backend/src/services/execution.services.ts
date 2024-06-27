import { openai } from '../config/openai.client';
import { ICard } from '../models/card.models'; // Import the Mongoose document type
import { generatePrompt } from '../utils/prompt.utils';
import { GenerativeModels } from '../types/GenerativeModels';

export const executeCard = async (
    card: ICard, // Use the Mongoose document type
): Promise<{ generatedText: string }> => {
    // Generate the prompt using the utility function
    const prompt = await generatePrompt(card._id);

    if (!prompt) {
        throw new Error("Failed to generate prompt. Cannot generate output.");
    }

    // Validate and get the actual model name
    if (!GenerativeModels.isValidModel(card.generativeModel as string)) {
        throw new Error(`Unsupported generative model: ${card.generativeModel}`);
    }
    const modelName = GenerativeModels.getModelName(card.generativeModel as string);

    try {
        const response = await openai.getChatCompletions(
            modelName, // Use the actual model name
            [
                {
                    role: 'system',
                    content: `You are an AI assistant that helps users complete tasks based on provided instructions and context. Provide clear, concise, and comprehensive responses. Ensure the answers are formatted correctly for display on the frontend and avoid unnecessary repetition. If uncertain, indicate that more information is needed.`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            { maxTokens: 3750, temperature: 0.7 } // Options object
        );

        const generatedText = response.choices[0].message?.content?.trim() || '';

        return { generatedText };
    } catch (error: any) {
        console.error("Error generating completion:", error.message);
        throw error;
    }
};