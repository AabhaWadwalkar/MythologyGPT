from pydantic import  BaseModel

class GodRelationship(BaseModel):
    parents: list[str]
    spouse: list[str]
    children: list[str]

class GodModel(BaseModel):
    name: str
    category: str
    role: str
    powers: list[str]
    symbols: list[str]
    relationships: GodRelationship
    description: str
    stories: list[str]
    sources: list[str]
