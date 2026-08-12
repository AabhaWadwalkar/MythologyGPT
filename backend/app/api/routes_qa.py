from fastapi import FastAPI, Request
from app.services.rag_service import answer_question
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

localhost = "http://localhost:3000"

cors_config = {
    "allow_origins": [localhost],
    "allow_credentials": True,
    "allow_methods": ["*"],
}

app.add(CORSMiddleware, **cors_config)


@app.post("/ask")
async def ask_questions(request: Request):
    data = await request.json()
    print("daaaaattttaaaaa:",data)
    if len(data)==0:
        return {"error": "Invalid input"}
    else:
        ans = answer_question(data)
        print("annnnnnnnnnsssssss:",ans)
    return ans


