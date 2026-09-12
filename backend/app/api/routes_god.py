from fastapi import APIRouter, HTTPException
from app.services.god_service import get_god_by_name
from app.models.god_model import GodModel

god_router = APIRouter()

@god_router.get("/god/{god_name}", response_model=GodModel)
async def get_god(god_name: str):
    ans = await get_god_by_name(god_name)
    if not ans:
        raise HTTPException(status_code=404, detail="God not found")
    return ans