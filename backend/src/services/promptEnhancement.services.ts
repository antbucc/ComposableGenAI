// src/services/promptEnhancement.services.ts

import { openai } from '../config/openai.client';

/**
 * Enhance a given prompt using the Azure OpenAI model.
 * 
 * @param prompt - The input prompt to be enhanced.
 * @returns The enhanced prompt.
 */
export const enhancePrompt = async (prompt: string): Promise<string> => {
    if (!prompt) {
        throw new Error("Input prompt cannot be empty");
    }

    try {
        const response = await openai.getChatCompletions(
            process.env.MODEL_NAME + "", // Deployment name from environment variables
            [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            { maxTokens: 3750, temperature: 0.7 } // Options object
        );

        const enhancedPrompt = response.choices[0].message?.content?.trim() || '';

        return enhancedPrompt;
    } catch (error: any) {
        console.error("Error enhancing prompt:", error.message);
        throw error;
    }
};

const systemPrompt = `
You are an advanced AI assistant specialized in enhancing user prompts. Your task is to make these prompts more detailed, comprehensive, and engaging by following best practices in prompt engineering.

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

**Task**: Enhance the following prompt while adhering to these guidelines.

**Input Prompt**:
\`\`\`
[Insert your original prompt here]
\`\`\`

**Enhanced Prompt Example**:

*Original Prompt*: "Describe the process of photosynthesis."

*Enhanced Prompt*:
\`\`\`
## Task
**Objective**: Explain the process of photosynthesis in a way that is detailed, comprehensive, and engaging.

## Instructions
1. **Introduction**: Begin with a brief overview of photosynthesis.
2. **Details**: Include the key stages of photosynthesis (light-dependent reactions and Calvin cycle).
3. **Engagement**: Use analogies or interesting facts to make the explanation more engaging.
4. **Structure**: Organize your explanation into clear sections with headings.
5. **Context**: Explain why photosynthesis is important for plants and the environment.
6. **Relevance**: Ensure the explanation is suitable for a high school biology student.
7. **Examples**: Provide examples of plants that perform photosynthesis and how it benefits them.
8. **Conclusion**: Summarize the main points and their significance.

## Main Prompt
**Photosynthesis** is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. It involves two main stages: the light-dependent reactions and the Calvin cycle.

## Context
Photosynthesis is crucial for life on Earth as it provides the primary source of organic matter for all living organisms. It also releases oxygen, which is necessary for respiration in most living organisms.

## Examples
For instance, in the light-dependent reactions, chlorophyll absorbs sunlight and converts it into chemical energy. In the Calvin cycle, this energy is used to convert carbon dioxide and water into glucose, a type of sugar that plants use for food.

## Conclusion
Understanding photosynthesis helps us appreciate how plants sustain life on Earth by producing food and oxygen, highlighting the importance of preserving plant life and ecosystems.
\`\`\`
`;
