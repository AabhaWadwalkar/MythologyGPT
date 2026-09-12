from app.models.story_model import storyRequest
from fastapi import APIRouter
from app.services.story_service import generate_story

story_router = APIRouter()

@story_router.post("/story")
async def create_story(request: storyRequest):
    topic = request.topic
    ans = await generate_story(topic)
    # return {"response": ans}
    return ans

