import asyncio
from app.services.embedding_service import generate_embedding
from app.db.mongo import db

collection = db["RAG Documents"]


async def answer_question():
    data = generate_embedding("Who is Odin?")
    ans = collection.aggregate([
        {
            "$vectorSearch": {
                "index": "vector_search",
                "vector": data,
                "path": "embedding",
                "k": 3
                
            }
        }
    ])
    print("anssssssss:",ans)
    return ans



if __name__ == "__main__":
    asyncio.run(answer_question())