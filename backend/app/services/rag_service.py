import asyncio
from app.services.embedding_service import generate_embedding
from app.db.mongo import db
from app.services.agent_service import generate_llm_response

collection = db["RAG Documents"]
gods_collection = db["Gods"]


async def answer_question(question: str):
    rag_context = await retrieve_documents(question)
    god_name = await find_god_in_question(question)
    god_context = " "
    if god_name:
        god_context = await retrieve_god_from_database(god_name)

    data = f"""
    RAG Context: {rag_context}

    God Database Context: {god_context}
    """
    # data = await retrieve_documents(question)
    # print("Retrived daaaaaaaaaaaaatttttaaaaaaaaaaa:", data)
    if not data:
        return "No context found"
    # prompt = f"Answer the question using only the information provided in the context below.If the answer cannot be found in the context, say 'Context not found'.Do not use outside knowledge or make up information. :\n\nContext: {data}\n\n Question: {question}\n\nAnswer:"
    prompt = f"""
    You are the QA Agent of a closed-domain mythology knowledge system.

    Your task is to answer the user's question using ONLY the information explicitly provided in the context.

    CONTEXT:
    {data}

    QUESTION:
    {question}

    STRICT RULES:
    1. The provided context is your ONLY source of factual information.
    2. Do NOT use your pretrained knowledge or outside knowledge.
    3. Do NOT invent, assume, infer, or add facts that are not explicitly supported by the context.
    4. Do not treat generally known mythology information as true unless it appears in the provided context.
    5. If the context contains enough information, answer the question clearly and directly.
    6. You may combine information from multiple context passages when doing so does not introduce new facts.
    7. If only part of the question can be answered from the context, answer only that part and clearly state what information is unavailable.
    8. If the answer cannot be found in the context, respond exactly:
    "No context found. The provided knowledge base does not contain enough information to answer this question."
    9. Do not mention information from the context that is unrelated to the question.
    10. Do not describe your reasoning process.

    Before answering, verify that every factual claim in your answer is supported by the provided context.

    ANSWER:
    """
    try:
        # print("Proooooooommmpt:", prompt)
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
    print("conteeeeexxxxxxxxxxtttt:", context)
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

async def retrieve_god_from_database(god_name):

    if not god_name:
        return "No god found"

    ans = await gods_collection.find_one({
        "name": god_name
    })

    if not ans:
        return "No god found"

    name = ans.get("name")
    category = ans.get("category")
    role = ans.get("role")
    powers = ans.get("powers", [])
    symbols = ans.get("symbols", [])
    relationships = ans.get("relationships", {})
    description = ans.get("description")
    stories = ans.get("stories", [])
    sources = ans.get("sources", [])

    parents = relationships.get("parents", [])
    spouse = relationships.get("spouse", [])
    children = relationships.get("children", [])

    context = f"""
God: {name}
Category: {category}
Role: {role}
Powers: {", ".join(powers)}
Symbols: {", ".join(symbols)}
Parents: {", ".join(parents) if parents else "None"}
Spouse: {", ".join(spouse) if spouse else "None"}
Children: {", ".join(children) if children else "None"}
Description: {description}
Stories: {"; ".join(stories)}
Sources: {", ".join(sources)}
"""

    return context

async def find_god_in_question(question):
    if not question:
        return None

    async for doc in gods_collection.find({}, {"name": 1}):
        god_name = doc.get("name")

        if god_name and god_name.lower() in question.lower():
            return god_name
    return None


if __name__ == "__main__":
    result = asyncio.run(answer_question("Who is Odin?"))
    print(result)










