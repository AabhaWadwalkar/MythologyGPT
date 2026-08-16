# MythologyGPT

A Python backend for a mythology question-answering application. It uses FastAPI for HTTP endpoints, MongoDB for mythology records and RAG documents, and the `all-MiniLM-L6-v2` SentenceTransformer model to generate document embeddings.

## What is included

- `backend/app/main.py` — FastAPI application with a health-style root endpoint and a MongoDB `Gods` collection reader.
- `backend/app/db/mongo.py` — asynchronous MongoDB connection setup.
- `backend/app/services/embedding_service.py` — loads the embedding model and converts text into vectors.
- `backend/app/scripts/generate_embeddings.py` — generates and stores an `embedding` field for every document in the `RAG Documents` collection.
- `backend/app/services/rag_service.py` — performs a MongoDB Atlas vector search against `RAG Documents`.
- `backend/test.py` — simple database connection test.

The `api/routes_qa.py`, graph, comparison, model, configuration, and prompt template files are present but are not wired into `app/main.py` yet.

## Prerequisites

- Python 3.11 or later
- A running MongoDB instance, or a MongoDB Atlas cluster
- Internet access on the first run, so SentenceTransformers can download `all-MiniLM-L6-v2`

For vector search, use MongoDB Atlas and create a vector-search index named `vector_search` on the `RAG Documents` collection. Its vector field must be named `embedding`; `all-MiniLM-L6-v2` produces 384-dimensional vectors.

## Setup

Run these commands from the project root.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a `.env` file in the project root (it is ignored by Git):

```env
MONGODB_URI=mongodb://localhost:27017/MythologyGPT
```

For Atlas, replace the value with the connection URI for your cluster, for example `mongodb+srv://<username>:<password>@<cluster>/<database>`.

If `MONGODB_URI` is omitted, the application defaults to `mongodb://localhost:27017/MythologyGPT`.

## Run the API

```powershell
cd backend
uvicorn app.main:app --port 8000 --reload
```

The server starts at <http://127.0.0.1:8000>. Available endpoints are:

- `GET /` — returns `{"message": "Hello World"}`.
- `GET /testing-db` — returns all documents in the MongoDB `Gods` collection.
- `GET /docs` — opens FastAPI's interactive API documentation.

Stop the server with `Ctrl+C`.

## Test the database connection

From the `backend` directory, run:

```powershell
python test.py
```

It pings MongoDB and prints whether the connection succeeded.

## Generate RAG embeddings

First add documents to the `RAG Documents` collection. Each document needs a `text` field; other useful fields include `god`, `category`, `type`, and `source`.

Then, from the `backend` directory, run:

```powershell
python -m app.scripts.generate_embeddings
```

The script reads every document, generates an embedding from its `text`, and saves the result in an `embedding` field. It can be re-run after adding or changing documents.

## RAG search script

After embeddings and the Atlas vector index are ready, run:

```powershell
python -m app.services.rag_service
```

The script currently searches for the fixed question `Who is Odin?` and prints the MongoDB aggregation cursor. Adjust that question in `backend/app/services/rag_service.py` to try another query.

## Current QA-route status

`backend/app/api/routes_qa.py` defines a separate `/ask` application, but it is not included in the main API. It also calls the RAG function with an argument even though the current function accepts none, and does not await it. Therefore `/ask` needs implementation work before it can be used as a working question-answering endpoint.

## Project structure

```text
.
├── requirements.txt
├── backend/
│   ├── test.py
│   └── app/
│       ├── main.py
│       ├── api/
│       ├── config/
│       ├── db/
│       ├── models/
│       ├── scripts/
│       ├── services/
│       └── utils/
└── README.md
```





Create a new chat in the Project and ask something like:

"I want you to reconstruct the complete history of this Project. Use the previous conversations in this Project as your sources. Analyze them together rather than treating this as a summary of only the current chat. Give me: (1) the chronological flow, (2) what we originally intended, (3) major ideas and decisions, (4) how those decisions changed over time, (5) important information discovered, (6) unresolved questions/problems, and (7) the current state and next logical steps. If something cannot be determined from the project conversations, explicitly say so rather than inventing it."

So the short answer is:

Yes ✅ — you can open a fresh chat inside your Project and ask it to synthesize the previous chats in that Project.
No ⚠️ — don't assume it is literally loading every message from every chat verbatim; it retrieves/uses relevant project context.
