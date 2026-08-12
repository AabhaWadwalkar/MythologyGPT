import asyncio
from app.db.mongo import testing_connection

async def main():
    print("Tessssstting")
    await testing_connection()

if __name__ == "__main__":
    asyncio.run(main())