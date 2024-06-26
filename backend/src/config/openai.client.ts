import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
if (!endpoint || !apiKey) {
    throw new Error("Missing environment variables for OpenAI configuration");
}

const openai = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
const credential = new AzureKeyCredential(apiKey);

export { openai, credential, endpoint };
