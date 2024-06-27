// src/utils/secrets.ts
import { cleanEnv, str, port, bool } from 'envalid';

export const env = cleanEnv(process.env, {
    CORS_ORIGINS: str(),
    AZURE_OPENAI_API_KEY: str(),
    AZURE_OPENAI_ENDPOINT: str(),
    GPT_3_5_TURBO_MODEL_NAME: str(),
    GPT_4_MODEL_NAME: str(),
    EVAL_AZURE_OPENAI_API_KEY: str(),
    EVAL_AZURE_OPENAI_ENDPOINT: str(),
    EVAL_AZURE_OPENAI_API_VERSION: str(),
    EVAL_AZURE_OPENAI_DEPLOYMENT: str(),
    MONGO_INITDB_ROOT_USERNAME: str(),
    MONGO_INITDB_ROOT_PASSWORD: str(),
    MONGO_URL: str(),
    PORT: port({ default: 5000 }),
});

export const {
    CORS_ORIGINS,
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_ENDPOINT,
    GPT_3_5_TURBO_MODEL_NAME,
    GPT_4_MODEL_NAME,
    EVAL_AZURE_OPENAI_API_KEY,
    EVAL_AZURE_OPENAI_ENDPOINT,
    EVAL_AZURE_OPENAI_API_VERSION,
    EVAL_AZURE_OPENAI_DEPLOYMENT,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_URL,
    PORT
} = env;
