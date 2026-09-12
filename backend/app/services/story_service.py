from app.models.story_model import storyRequest
from app.services.rag_service import retrieve_god_information
from app.services.agent_service import generate_llm_response

async def generate_story(topic):
    res = await retrieve_god_information(topic)
    if res=="No context found":
        return {"response": "No context found"}
    story_prompt = f"""
You are a mythology storytelling assistant for a closed-domain knowledge system.

Your task is to create a story about {topic} using ONLY the information explicitly present in the provided context.

CONTEXT:
{res}

STRICT GROUNDING RULES:
1. The context is your ONLY source of factual information.
2. Do NOT use your pretrained knowledge or outside knowledge.
3. Do NOT add any fact, character, location, event, relationship, power, title, or historical detail that is not explicitly stated in the context.
4. Do NOT assume that a commonly known mythology fact is true unless it appears in the context.
5. Do NOT fill missing information using your own knowledge.
6. Every factual statement in your story must be supported by the context.
7. You may rearrange and connect facts that are explicitly present in the context to make the narrative readable, but you must not create new events or details.
8. If the context contains only a few facts, create a short story using only those facts. Do NOT expand it with outside mythology.
9. If the context does not contain enough information to create a story, respond exactly with:
   "No context found. The provided knowledge base does not contain enough information to tell this story."

IMPORTANT:
Before generating the story, mentally verify that every factual detail you intend to include appears in the context.

Write the story in a clear and engaging narrative style while remaining completely faithful to the provided context.

STORY:
"""
    try:
        ans = generate_llm_response(story_prompt)
        return {"response": ans}
    except Exception:
        return {"response": "Unable to generate story"}