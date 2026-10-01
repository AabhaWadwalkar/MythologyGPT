# AI Mythology Knowledge Engine

An AI-powered mythology knowledge system that combines **Retrieval-Augmented Generation (RAG), vector search, specialized AI agents, and a knowledge graph** to explore mythology through intelligent question answering, comparisons, storytelling, and relationship visualization.

## About the Project

The **AI Mythology Knowledge Engine** is a personal AI engineering project built to explore and practice the development of a structured AI application using modern full-stack and AI technologies.

Instead of functioning as a simple chatbot, the system combines multiple components:

- **RAG-based question answering** using a custom mythology knowledge base
- **Vector search** for retrieving relevant mythology information
- **AI agents** for question answering, comparison, and storytelling
- **Knowledge Graph** for visualizing relationships between mythological figures
- **God Detail pages** for structured mythology information
- **Interactive React frontend** for exploring the system

The project was built primarily for **learning, hands-on practice, understanding AI application architecture, and developing a strong portfolio project for my resume**.

## Features

### 1. RAG-Based Question Answering

The system uses a Retrieval-Augmented Generation (RAG) pipeline to answer mythology-related questions using information retrieved from the custom mythology knowledge base.

- Semantic search using embeddings
- MongoDB Atlas Vector Search
- Context-based answer generation
- Answers grounded in the available knowledge base

### 2. AI Question Answering Agent

The QA Agent handles general mythology questions and retrieves relevant information before generating an answer.

### 3. AI Comparison Agent

The Comparison Agent allows users to compare two mythological figures based on information available in the knowledge base.

Examples of comparison areas include:

- Roles
- Powers
- Characteristics
- Mythological information

### 4. AI Story Agent

The Story Agent generates mythology-based stories from a user-provided topic while following the information available to the system.

### 5. Knowledge Graph

The system represents relationships between mythological figures as a knowledge graph.

The graph can visualize relationships such as:

- Parents
- Spouse
- Children
- Other defined relationships

Users can interact with the graph and open the corresponding God Detail page by selecting a node.

### 6. God Detail Pages

Each mythological figure has a structured detail page containing information such as:

- Category
- Role
- Powers
- Symbols
- Relationships
- Description
- Stories
- Sources

### 7. Interactive Web Interface

The React frontend provides dedicated interfaces for:

- Home / Question Answering
- AI Chat
- God Comparison
- Story Generation
- God Details
- Knowledge Graph

### 8. Responsive UI

The application includes a responsive dark mythology-themed interface designed for desktop, tablet, and mobile screen sizes.

## System Architecture

The project follows a full-stack AI application architecture:

```text
                         ┌─────────────────────────┐
                         │      React Frontend     │
                         │   React + TypeScript    │
                         └────────────┬────────────┘
                                      │
                                      │ HTTP Requests
                                      ▼
                         ┌─────────────────────────┐
                         │      FastAPI Backend    │
                         │       REST APIs         │
                         └────────────┬────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             ┌────────────┐    ┌────────────┐    ┌────────────┐
             │ RAG / QA   │    │ AI Agents  │    │ Knowledge  │
             │ Pipeline   │    │            │    │   Graph    │
             └─────┬──────┘    └─────┬──────┘    └─────┬──────┘
                   │                 │                 │
                   └─────────────────┼─────────────────┘
                                     ▼
                         ┌─────────────────────────┐
                         │      MongoDB Atlas      │
                         │                         │
                         │  Knowledge + Embeddings │
                         │  + Relationships        │
                         └─────────────────────────┘


### 9. RAG Process
The user submits a mythology-related question through the React frontend.
The FastAPI backend receives the question.
The question is converted into an embedding using the embedding model.
MongoDB Atlas Vector Search retrieves the most relevant documents from the mythology knowledge base.
The retrieved information is combined into a context.
The context and the user's question are provided to the language model.
The model generates an answer based on the retrieved context.
The generated response is returned to the React frontend.

## AI Agents

The system includes three specialized AI agents:

- **QA Agent** — Answers mythology-related questions using retrieved knowledge.
- **Comparison Agent** — Compares two mythological figures using available knowledge.
- **Story Agent** — Generates mythology-based stories from a given topic.

## Knowledge Graph

The Knowledge Graph represents relationships between mythological figures such as parents, spouses, and children.

Users can:
- Visualize relationships interactively
- Hover over connections to view relationship types
- Click a figure to open its detailed page

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | FastAPI, Python |
| Database | MongoDB Atlas |
| Vector Search | MongoDB Atlas Vector Search |
| AI / LLM | Ollama |
| Embeddings | Sentence Transformers |
| Graph | React Force Graph |
| API Communication | REST APIs |

## Project Structure

```text
MythologyGPT/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── config/
│   │   ├── db/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── CSS/
│   └── package.json
│
└── README.md

## How to Run

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py

### Frontend
cd frontend
npm install
npm run dev

The frontend communicates with the FastAPI backend through REST APIs.

