from fastapi import APIRouter
from app.services.rag_service import answer_question
from app.models.qa_model import Item

qa_router = APIRouter()

@qa_router.post("/ask")
async def ask_questions(request: Item):
    question =  request.question
    print("daaaaattttaaaaa:",question)
    if not question:
        return {"error": "Question is required"}
    answer = await answer_question(question)
    print("annnnnnnnnnsssssss:",answer)
    return {"response" : answer}



