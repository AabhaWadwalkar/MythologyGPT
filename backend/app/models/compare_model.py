from pydantic import BaseModel, Field


class comparisonRequest(BaseModel):
    god1: str = Field(..., min_length=1)
    god2: str = Field(..., min_length=1)