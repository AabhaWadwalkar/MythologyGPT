from pydantic import BaseModel,Field

class relationship(BaseModel):
    source: str = Field(..., min_length=1)
    relation: str = Field(..., min_length=1)
    target: str = Field(..., min_length=1)