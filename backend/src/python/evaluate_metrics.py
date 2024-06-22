#src/python/evaluate_metrics.py
import os
import sys
import json
from promptflow.core import AzureOpenAIModelConfiguration
from dotenv import load_dotenv

load_dotenv()

model_config = AzureOpenAIModelConfiguration(
    azure_endpoint=os.getenv("EVAL_AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("EVAL_AZURE_OPENAI_API_KEY"),
    azure_deployment=os.getenv("EVAL_AZURE_OPENAI_DEPLOYMENT"),
    api_version=os.getenv("EVAL_AZURE_OPENAI_API_VERSION")
)

from promptflow.evals.evaluators import RelevanceEvaluator, GroundednessEvaluator, CoherenceEvaluator, FluencyEvaluator  # type: ignore

relevance_eval = RelevanceEvaluator(model_config)
groundedness_eval = GroundednessEvaluator(model_config)
coherence_eval = CoherenceEvaluator(model_config)
fluency_eval = FluencyEvaluator(model_config)

def evaluate(answer, context, question):
    try:
        relevance_score = relevance_eval(answer=answer, context=context, question=question)
        groundedness_score = groundedness_eval(answer=answer, context=context, question=question)
        coherence_score = coherence_eval(answer=answer, context=context, question=question)
        fluency_score = fluency_eval(answer=answer, context=context, question=question)

        return {
            "relevance_score": relevance_score,
            "groundedness_score": groundedness_score,
            "coherence_score": coherence_score,
            "fluency_score": fluency_score,
        }
    except Exception as e:
        print(f"Error during evaluation: {e}", file=sys.stderr)
        return {
            "relevance_score": None,
            "groundedness_score": None,
            "coherence_score": None,
            "fluency_score": None,
        }

def load_input(input_source):
    try:
        if os.path.isfile(input_source):
            with open(input_source, 'r') as file:
                return json.load(file)
        else:
            return json.loads(input_source)
    except Exception as e:
        print(f"Error loading input: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python evaluate_metrics.py <input_json_or_file_path>", file=sys.stderr)
        sys.exit(1)

    input_data = load_input(sys.argv[1])
    answer = input_data["answer"]
    context = input_data["context"]
    question = input_data["question"]

    results = evaluate(answer, context, question)
    print(json.dumps(results))
