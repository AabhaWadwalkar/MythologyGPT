import asyncio
from app.services.embedding_service import generate_embedding
from app.db.mongo import db
from app.services.agent_service import generate_llm_response

collection = db["RAG Documents"]


async def answer_question(question: str):
    data = await retrieve_documents(question)
    if not data:
        return "No context found"
    prompt = f"Answer the question using only the information provided in the context below.If the answer cannot be found in the context, say 'Context not found'.Do not use outside knowledge or make up information. :\n\nContext: {data}\n\n Question: {question}\n\nAnswer:"
    try:
        answer = generate_llm_response(prompt)
        return answer
    except Exception:
        return "Unable to generate answer"

        
async def retrieve_documents(query:str):
    ans = generate_embedding(query)
    documents=[]
    res = collection.aggregate([
        {
            "$vectorSearch":{
                "index": "vector_search",
                "queryVector": ans,
                "path": "embedding",
                "numCandidates": 60,
                "limit":3
            }
        }
    ])
    async for doc in res:
        content = doc.get("text")
        if content:
            documents.append(content)
    context = "\n".join(documents)
    return context

async def retrieve_god_information(god_name):
    documents=[]
    if god_name:
        ans = collection.find({
            "god": god_name
        })
    async for doc in ans:
        content = doc.get("text")
        if content:
            documents.append(content)
    context = "\n".join(documents)
    if context:
        return context
    else:
        return "No context found"


if __name__ == "__main__":
    result = asyncio.run(answer_question("Who is Odin?"))
    print(result)



    # data = generate_embedding(question)          #this generates embedding for the question
    # documents = []                                     # this created an empty list to store retrieved docs
    # ans = collection.aggregate([                       # aggregation pipeline to perform vector search on collection
    #     {
    #         "$vectorSearch": {
    #             "index": "vector_search",              # I created a vector search index on collection with name "vector_search"
    #             "queryVector": data,
    #             "path": "embedding",
    #             "numCandidates": 60,
    #             "limit": 3                             # top 3 docs will be retieved based on similarity to question embedding
    #         }
    #     }
    # ])
    # async for doc in ans:
    #     content = doc.get("text")
    #     if content:
    #         documents.append(content)
    # context = "\n".join(documents)







