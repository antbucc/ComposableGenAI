// src/types/GenerativeModels.ts
import { GPT_3_5_TURBO_MODEL_NAME, GPT_4_MODEL_NAME } from '../utils/secrets';

export class GenerativeModels {
    static readonly ModelMapping: { [key: string]: string } = {
        GPT_3_5_TURBO: GPT_3_5_TURBO_MODEL_NAME,
        GPT_4: GPT_4_MODEL_NAME
    };

    static isValidModel(model: string): boolean {
        return model in GenerativeModels.ModelMapping;
    }

    static getModelName(model: string): string {
        return GenerativeModels.ModelMapping[model];
    }
}
