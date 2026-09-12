from fastapi import APIRouter
from app.services.graph_service import get_graph_data

graph_router = APIRouter()


@graph_router.get("/graph")
async def get_graph():
    ans = await get_graph_data()
    return {"response": ans}