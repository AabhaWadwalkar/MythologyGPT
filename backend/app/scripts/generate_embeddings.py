import asyncio

from app.services.embedding_service import generate_embedding
from app.db.mongo import db

collection = db["RAG Documents"]
print("Inside read_documents")


async def read_documents():
    print("Inside read_documents")
    data = await collection.find().to_list(length=None)
    # print("dattttttttaaaa:",data)
    for document in data:
        text = document.get("text")
        # print("teeexxxxxtttt:", text)
        if text:
            embedding = generate_embedding(text)
            await collection.update_one({"_id": document["_id"]},{"$set": {"embedding": embedding}})
        # print("upddaaattted data:", data)
        
    return data

if __name__ == "__main__":
    asyncio.run(read_documents())