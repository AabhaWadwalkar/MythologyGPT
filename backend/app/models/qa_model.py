from pydantic import BaseModel,Field


class Item(BaseModel):
    question: str = Field(..., min_length=1)