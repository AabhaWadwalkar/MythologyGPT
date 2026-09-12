from app.db.mongo import db
from fastapi import  HTTPException

collection = db["Gods"]


async def get_god_by_name(god_name):
    ans =  await collection.find_one({"name": {"$regex": f"^{god_name}$", "$options": "i"}})
    if not ans:
        raise HTTPException(status_code=404, detail="God not found")
    return ans