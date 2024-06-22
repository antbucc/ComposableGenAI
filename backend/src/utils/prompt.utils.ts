// src/utils/prompt.utils.ts
import { CardModel } from '../models/card.models';
import { ExecutionDataModel } from '../models/executionData.models';

/**
 * Generates a prompt for a generative AI task based on the provided card details.
 * 
 * @param cardId - The ID of the card containing details of the task.
 * @returns The generated prompt string.
 */
export async function generatePrompt(cardId: string): Promise<string> {
    // Fetch the card details
    const card = await CardModel.findById(cardId).exec();

    if (!card) {
        throw new Error('Card not found');
    }

    const { prompt, context } = await card.getFormattedDetails();

    // Fetch the execution data from previous cards

    // Construct the instructions
    const instructions = `
        ## Task
        **Objective:** ${card.objective}

        ## Instructions
        - Provide a detailed and comprehensive response based on the task.
        - Ensure the response is relevant to the task and follows the given instructions closely.
        - The response should be complete and formatted correctly for display on the frontend.
        - Avoid repeating unnecessary information and focus on the key points.
        - Ensure clarity in the answer.
        - Consider that the output may be used as the next card input and included in subsequent prompts.
        - Use bullet points, headings, and clear syntax to structure the response.
    `;

    // Construct the main prompt section
    const mainPromptSection = `
        ## Main Prompt
        ${prompt}
    `;

    // Construct the context section
    const contextSection = `
        ## Context
        ${context}
    `;

    // Combine all sections into the final structured prompt
    const structuredPrompt = `
        ${instructions}

        ${mainPromptSection}

        ${contextSection}


        ## Note
        Ensure the answer is exhaustive and clear even without reading the context above. Provide any relevant citations if needed. Use Markdown format for better readability.
    `;

    return structuredPrompt.trim();
}
