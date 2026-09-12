from app.db.mongo import  db

collection = db["Relationships"]

async def get_relationships():
    documents=[]
    ans = collection.find({})

    async for doc in ans:
        data = {
            "source":doc.get("source"),
            "relation":doc.get("relation"),
            "target": doc.get("target")
        }
        documents.append(data)
    return documents

async def get_graph_data():
    ans = await get_relationships()
    unique_nodes = set()
    for doc in ans:
        unique_nodes.add(doc.get("source"))
        unique_nodes.add(doc.get("target"))

    nodes = []

    for node in unique_nodes:
        nodes.append({
            "id": node
        })

    links = []
    for doc in ans:
        links.append(doc)


    return {"nodes": nodes, "links": links}