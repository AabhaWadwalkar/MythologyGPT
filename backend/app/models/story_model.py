from pydantic import BaseModel, Field

class storyRequest(BaseModel):
    topic: str = Field(..., min_length=1)