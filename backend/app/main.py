from fastapi import FastAPI
from app.db.mongo import testing_connection
from app.db.mongo import db
from app.api.routes_qa import qa_router
from app.api.routes_compare import compare_router
from app.api.routes_story import story_router
from app.api.routes_graph import graph_router
from app.api.routes_god import god_router
from fastapi.middleware.cors import CORSMiddleware
from app.services.graph_service import get_graph_data


app = FastAPI()

localhost = "http://localhost:5173"

cors_config = {
    "allow_origins": [localhost],
    "allow_headers": ["*"],
    "allow_credentials": True,
    "allow_methods": ["*"],
}

app.add_middleware( CORSMiddleware,**cors_config)

app.include_router(qa_router)
app.include_router(compare_router)
app.include_router(story_router)
app.include_router(graph_router)
app.include_router(god_router)

@app.get("/")
def test():
    return {"message": "Hello World"}

@app.on_event("startup")
async def startup_event():
    await testing_connection()


@app.get("/testing-db")
async def testing_db():
    documents = []
    res = db["Gods"].find()
    print(res)
    async for document in res:
        document["_id"] = str(document["_id"])
        documents.append(document)
        print(documents)
    return{"data": documents}

# @app.get("/testing_graph")
# async def testing_relations_docs():
#     # ans = await get_relationships()
#     ans = await get_graph_data()
#     return {"ans": ans}