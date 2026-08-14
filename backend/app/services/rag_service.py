import asyncio
from app.services.embedding_service import generate_embedding
from app.db.mongo import db

collection = db["RAG Documents"]


async def answer_question(question: str):
    data = generate_embedding(question)          #this generates embedding for the question
    documents = []                                     # this created an empty list to store retrieved docs
    ans = collection.aggregate([                       # aggregation pipeline to perform vector search on collection
        {
            "$vectorSearch": {
                "index": "vector_search",              # I created a vector search index on collection with name "vector_search"
                "queryVector": data,
                "path": "embedding",
                "numCandidates": 60,
                "limit": 3                             # top 3 docs will be retieved based on similarity to question embedding
            }
        }
    ])
    async for doc in ans:
        content = doc.get("text")
        if content:
            documents.append(content)
    context = "\n".join(documents)

    prompt = f"Answer the question using only the information provided in the context below.If the answer cannot be found in the context, say 'Context not found'.Do not use outside knowledge or make up information. :\n\nContext: {context}\n\n Question: {question}\n\nAnswer:"
    # print(prompt)
    return prompt
        


if __name__ == "__main__":
    result = asyncio.run(answer_question("Who is Odin?"))
    print(result)