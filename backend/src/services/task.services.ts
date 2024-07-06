import { openai } from '../config/openai.client';
import { ITask } from '../models/task.models'; // Import the Mongoose document type
import { generateCardSequencePrompt } from '../utils/prompt.utils'; // Adjust the import according to your utils structure
import { GenerativeModels } from '../types/GenerativeModels';

/**
 * Generates a task and retrieves a flow of interconnected cards.
 * 
 * @param task - The task document containing details for card generation.
 * @param generativeModel - The generative model to be used.
 * @returns A polished JSON object containing the generated cards.
 */
export const generateTask = async (
    task: ITask, // Use the Mongoose document type
    generativeModel: string
): Promise<{ cards: Array<{ title: string; objective: string; prompt: string; context: string; exampleOutput: string; dependencies: string[] }> }> => {
    // Validate and get the actual model name
    if (!GenerativeModels.isValidModel(generativeModel)) {
        throw new Error(`Unsupported generative model: ${generativeModel}`);
    }
    const modelName = GenerativeModels.getModelName(generativeModel);

    // Generate the card sequence prompt using the utility function
    const prompt = await generateCardSequencePrompt(task.name, task.objective, generativeModel);

    if (!prompt) {
        throw new Error("Failed to generate card sequence prompt. Cannot generate output.");
    }

    try {
        const response = await openai.getChatCompletions(
            modelName, // Use the actual model name
            [
                {
                    role: 'system',
                    content: `You are an AI assistant specialized in generating sequences of interconnected task cards based on provided instructions and context. Your goal is to produce clear, concise, and comprehensive task cards. Ensure each card has a distinct objective and that the flow of tasks is logical and coherent.`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            { maxTokens: 3750, temperature: 0.7 } // Options object
        );

        const rawText = response.choices[0].message?.content?.trim() || '';

        // Check if the response is in JSON format and remove markdown
        const jsonString = rawText.replace(/^```json|```|'''json|'''/g, '').trim();
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(jsonString);
        } catch (error: any) {
            console.error("Failed to parse JSON response:", error.message);
            throw new Error("The response is not a valid JSON.");
        }

        // Ensure we get the correct cards array
        const cards = Array.isArray(parsedResponse.cards) ? parsedResponse.cards : parsedResponse.cards.cards;

        if (!Array.isArray(cards)) {
            throw new Error("Invalid generated cards format");
        }

        return { cards };
    } catch (error: any) {
        console.error("Error generating completion:", error.message);
        throw error;
    }
};
