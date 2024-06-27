// src/utils/prompt.utils.ts
import { CardModel } from '../models/card.models';
import { enhancePrompt } from '../services/promptEnhancement.services';

/**
 * Generates a prompt for a generative AI task based on the provided card details.
 * 
 * @param cardId - The ID of the card containing details of the task.
 * @returns The generated prompt string.
 */
export async function generatePrompt(cardId: string): Promise<string> {
    const card = await CardModel.findById(cardId).exec();

    if (!card) {
        throw new Error('Card not found');
    }

    const { prompt, context, exampleOutput } = await card.getFormattedDetails();

    const instructions = `
        ## Task
        **Objective:** ${card.objective}

        ## Important
        - Follow closely the instructions of the prompt. Do not praise this prompt, provide only the requested information.
        - Avoid repeating the question or rephrasing the prompt. Directly address the task requirements.

        ## Instructions
        - Provide a detailed and comprehensive response based on the task. Do not include any detail on the task itself.
        - Ensure the response is relevant to the task and follows the given instructions closely.
        - The response should be complete and formatted correctly for display on the frontend.
        - Avoid repeating unnecessary information and focus on the key points.
        - Ensure clarity in the answer.
        - Consider that the output may be used as the next card input and included in subsequent prompts.
        - Use bullet points, headings, and clear syntax to structure the response.
    `;

    const mainPromptSection = `
        ## Main Prompt
        ${prompt}
    `;

    const contextSection = `
        ## Context
        ${context}
    `;

    const exampleOutputSection = exampleOutput ? `
        ##Respond using this format and structure, nothing less, nothing more.Do not include any other additional information or explaination of the output.
        ## Example Outputs
        ${exampleOutput}
    ` : '';

    const structuredPrompt = `
        ${instructions}

        ${mainPromptSection}

        ${contextSection}

       
        ${exampleOutputSection}

        ## Note
        Ensure the answer is exhaustive and clear even without reading the context above. Use Markdown format for better readability.
        Do not include any expaination of the output or introduction of the answer.
    `;
    console.log(structuredPrompt);
    return structuredPrompt.trim();
}

/**
 * Generates a prompt for a generative AI task based on the provided card details.
 * 
 * @param cardId - The ID of the card containing details of the task.
 * @returns The generated prompt string.
 */
export async function generateEnhancedPrompt(cardId: string): Promise<string> {
    // Fetch the card details
    const card = await CardModel.findById(cardId).exec();

    if (!card) {
        throw new Error('Card not found');
    }

    const { prompt, context } = await card.getFormattedDetails();

    // Construct the base prompt
    const basePrompt = `
        ## Task
        **Objective:** ${card.objective}

        ## Main Prompt
        ${prompt}

        ## Context
        ${context}

        ## Instructions
        - Provide a detailed and comprehensive response based on the task.
        - Ensure the response is relevant to the task and follows the given instructions closely.
        - The response should be complete and formatted correctly for display on the frontend.
        - Avoid repeating unnecessary information and focus on the key points.
        - Ensure clarity in the answer.
        - Consider that the output may be used as the next card input and included in subsequent prompts.
        - Use bullet points, headings, and clear syntax to structure the response.
        - Stick strictly to the request. Do not add any unnecessary or additional information. For example, if asked for a number between 2 and 30, simply provide a number like 5.

        ## Note
        Ensure the answer is exhaustive and clear even without reading the context above. Provide any relevant citations if needed. Use Markdown format for better readability.
    `;

    // Enhance the base prompt
    const systemMessage = `
        You are an advanced AI assistant specialized in enhancing user prompts. Your task is to make these prompts more detailed, comprehensive, and engaging by following best practices in prompt engineering.

        **Important**: Do not tell the user that they have made a good example. Instead, follow the instructions given and enhance the prompt accordingly.

        **Instructions**:
        1. **Clarity**: Ensure the enhanced prompt is clear and easy to understand.
        2. **Detail**: Add relevant details to make the prompt more informative.
        3. **Engagement**: Use engaging language to capture attention and encourage interaction.
        4. **Structure**: Organize the prompt logically with proper headings, bullet points, and numbering where appropriate.
        5. **Context**: Include necessary context to make the prompt self-contained and meaningful.
        6. **Relevance**: Maintain the original intent of the prompt while enhancing it.
        7. **Consistency**: Keep a consistent tone and style throughout.
        8. **Examples**: Provide examples or scenarios if they help clarify the prompt.
        9. **Brevity**: Be concise but thorough, avoiding unnecessary content.
        10. **Adherence**: Stick strictly to the request. Do not add any unnecessary or additional information.

        Enhance the following prompt while adhering to these guidelines.
    `;

    const enhancedPrompt = await enhancePrompt(`${systemMessage}\n\n${basePrompt}`);

    return enhancedPrompt.trim();
}
