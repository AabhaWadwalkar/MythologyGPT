from fastapi import FastAPI
from app.db.mongo import testing_connection
from app.db.mongo import db

app = FastAPI()

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

# @app.get("/testing-db")
# async def testing_db():
#     print("DB name:", db.name)
    

#     collections = await db.list_collection_names()
#     print("Collections:", collections)

#     documents = []
#     cursor = db["Gods"].find()

#     count = 0
#     async for document in cursor:
#         count += 1
#         document["_id"] = str(document["_id"])
#         documents.append(document)

#     print("Documents found:", count)

#     return {"data": documents}