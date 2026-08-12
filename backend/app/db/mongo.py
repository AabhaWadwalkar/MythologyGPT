import os
import asyncio
import motor.motor_asyncio 
from dotenv import load_dotenv
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/MythologyGPT")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
db = client["MythologyGPT"]

async def testing_connection():
    try:
        await client.admin.command("ping")
        print("Database connection successfull")
        print("Mongo URI:", MONGODB_URI)
    except Exception as e:
        print("Connection failed::", e)


if __name__ == "__main__":
    asyncio.run(testing_connection())