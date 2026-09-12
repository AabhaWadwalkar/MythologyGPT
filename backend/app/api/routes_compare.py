from fastapi import APIRouter
from app.models.compare_model import comparisonRequest
from app.services.compare_service import comparing_gods


compare_router = APIRouter()

@compare_router.post("/compare_gods")
async def receive_req(request: comparisonRequest):
    god1 = request.god1
    god2 = request.god2
    ans = await comparing_gods(god1,god2)
    return ans