# PromptDeck

- **Prompt**: Indicates the focus on creating and managing prompts for generative AI.
- **Deck**: Suggests a collection of cards, each representing a portion of the workflow, emphasizing the modular and organized approach of the platform.

The **PromptDeck** platform has the goal of simplifying the process of prompt engineering through an easy-to-use, card-based interface.
**PromptDeck**  is a project designed to utilize generative AIs for general tasks. This repository contains both the backend and frontend components.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Visual Studio Code Setup](#visual-studio-code-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Important Concepts](#important-concepts)
  - [Cards Concept](#cards-concept)

## Project Structure

```

PromptDeck /
├── backend/
│ ├── src/
│ ├── package.json
│ ├── Dockerfile
│ ├── docker-compose.yml
│ └── ... (other backend files)
├── frontend/
│ ├── src/
│ ├── package.json
│ └── ... (other frontend files)
├── .gitignore
└── README.md

```

---

## Setup Instructions

### Visual Studio Code Setup

1. **Install Visual Studio Code:**

   - **Download and install Visual Studio Code from the [official website](https://code.visualstudio.com/Download).**

2. **Clone the repository using Visual Studio Code:**

   - Open Visual Studio Code.
   - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
   - Type `Git: Clone` and select `Git: Clone`.
   - Enter the repository URL: `https://github.com/antbucc/PromptDeck`.
   - Select the local directory where you want to clone the repository.
   - Open the cloned repository in Visual Studio Code.

### Backend Setup

1. **Install Docker:**

   - **Via the Docker Desktop Application (Recommended for macOS and Windows):**

     - Follow the instructions to install Docker Desktop from the [official Docker website](https://www.docker.com/get-started).

   - **Via Terminal:**
     - **For macOS:**
       ```sh
       brew install --cask docker
       open /Applications/Docker.app
       ```
     - **For Ubuntu:**
       ```sh
       sudo apt-get update
       sudo apt-get install \
           ca-certificates \
           curl \
           gnupg \
           lsb-release
       curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
       echo \
         "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
         $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
       sudo apt-get update
       sudo apt-get install docker-ce docker-ce-cli containerd.io
       sudo usermod -aG docker $USER
       newgrp docker
       ```
     - **For Windows:**
       - Follow the instructions to install Docker Desktop from the [official Docker website](https://docs.docker.com/desktop/windows/install/).

2. **Open the Docker application (Docker Desktop) if using macOS or Windows. (Just needs to run in the background).**

3. **Navigate to the backend directory:**

   ```sh
   cd backend
   ```

4. **Setup the environment variables:**

   Create a `.env` file in the `backend` directory and define the necessary environment variables. These variables include:

   - `CORS_ORIGINS`: The URL for frontend access, typically `http://localhost:3000`.
   - `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key.
   - `AZURE_OPENAI_ENDPOINT`: The endpoint for your Azure OpenAI service.
   - `MODEL_NAME`: The name of the model to use, e.g., `gpt35Turbo`.
   - `AZURE_OPENAI_API_VERSION`: The version of the Azure OpenAI API.
   - `AZURE_OPENAI_DEPLOYMENT`: The deployment name for the model.
   - `EVAL_AZURE_OPENAI_API_KEY`: Your evaluation Azure OpenAI API key.
   - `EVAL_AZURE_OPENAI_ENDPOINT`: The endpoint for your evaluation Azure OpenAI service.
   - `EVAL_AZURE_OPENAI_API_VERSION`: The version of the Azure OpenAI API for evaluation.
   - `EVAL_AZURE_OPENAI_DEPLOYMENT`: The deployment name for the evaluation model.
   - `MONGO_INITDB_ROOT_USERNAME`: The root username for MongoDB.
   - `MONGO_INITDB_ROOT_PASSWORD`: The root password for MongoDB.
   - `MONGO_URL`: The connection URL for MongoDB.
   - `PORT`: The port number for the backend server, typically `5000`.

   Example `.env` file structure :

   ```plaintext
   CORS_ORIGINS=
   AZURE_OPENAI_API_KEY=
   AZURE_OPENAI_ENDPOINT=
   MODEL_NAME=
   AZURE_OPENAI_API_VERSION=
   AZURE_OPENAI_DEPLOYMENT=
   EVAL_AZURE_OPENAI_API_KEY=
   EVAL_AZURE_OPENAI_ENDPOINT=
   EVAL_AZURE_OPENAI_API_VERSION=
   EVAL_AZURE_OPENAI_DEPLOYMENT=
   MONGO_INITDB_ROOT_USERNAME=
   MONGO_INITDB_ROOT_PASSWORD=
   MONGO_URL=
   PORT=
   ```

5. **Build the Docker containers:**

   ```sh
   docker-compose build
   ```

6. **Start the backend server using Docker Compose:**

   ```sh
   docker-compose up
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```sh
   cd frontend
   ```

2. **Install the dependencies:**

   ```sh
   npm install
   ```

3. **Start the frontend development server:**

   ```sh
   npm start
   ```

---

## Usage

To use the project, follow the setup instructions above to start both the backend and frontend servers. Access the frontend application in your web browser to interact with the generative AI functionalities.

---

## Important concepts:

### Cards Concept

The core concept of this project revolves around "cards." Cards represent discrete units of generative AI tasks, each containing specific instructions, inputs, and configurations. They are designed to be flexible and modular, enabling users to easily create, modify, and manage AI tasks.

Each card typically includes:

- **Title**: A descriptive title for the card.
- **Objective**: The main goal or purpose of the card.
- **Prompt**: The input prompt for the generative AI model.
- **Generative Model**: The AI model used to generate the output.
- **Context**: Additional context or information to be used by the AI model, including the outputs from previous cards.
- **Previous Cards**: References to other cards whose outputs are used as context in the current card.
- **Next Cards**: References to other cards that will use the current card's output as context.
- **Output**: The generated result from the AI model, stored as an execution data document.

#### Evaluation Metrics

Each card's output is evaluated using several metrics to ensure quality and relevance. The evaluation metrics include:

- **Coherence**: Logical and consistent flow of sentences.
- **Relevance**: Pertinence to the given input or query.
- **Fluency**: Grammatical accuracy and appropriate vocabulary.
- **Groundedness**: Alignment with provided source data.
- **Average**: The average score of all evaluation criteria.

These metrics help in assessing the effectiveness and reliability of the generated outputs, ensuring that they meet the desired standards and objectives.

---
