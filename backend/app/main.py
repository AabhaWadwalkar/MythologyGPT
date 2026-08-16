from fastapi import FastAPI
from app.db.mongo import testing_connection
from app.db.mongo import db
from app.api.routes_qa import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

localhost = "http://localhost:8000"

cors_config = {
    "allow_origins": [localhost],
    "allow_headers": "headers",
    "allow_credentials": True,
    "allow_methods": ["*"],
}

app.add_middleware( CORSMiddleware,**cors_config)

app.include_router(router)

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

