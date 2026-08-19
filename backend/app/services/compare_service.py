from app.services.rag_service import retrieve_god_information
from app.services.agent_service import generate_llm_response


async def comparing_gods(god1,god2):
    ans1 = await retrieve_god_information(god1)
    print(ans1)
    ans2 = await retrieve_god_information(god2)
    print(ans2)
    if ans1=="No context found" or ans2=="No context found":
        return {"response": "No context found"}
    comparison_prompt = f"""
You are a mythology comparison assistant.

Compare {god1} and {god2} using ONLY the information explicitly provided in the contexts below.

God 1: {god1}
Context for {god1}:
{ans1}

God 2: {god2}
Context for {god2}:
{ans2}

Instructions:
- Use ONLY the information explicitly stated in the provided contexts.
- Every statement in your comparison must be directly supported by the provided context.
- Do not use outside knowledge.
- Do not invent, assume, infer, interpret, or add facts that are not explicitly stated.
- Do not combine separate facts to create a conclusion that is not directly supported by the context.
- Clearly identify similarities and differences only when they are explicitly supported by the contexts.
- Compare the following aspects when information is available:
  1. Role
  2. Powers and abilities
  3. Major stories or events
  4. Other relevant information explicitly mentioned in the contexts
- If information about an aspect is available for one god but not the other, state that the information is not available in the provided context for the other god.
- If the contexts do not contain enough information for a particular comparison, do not guess. State "Not enough context available for this comparison."
- If there is no useful information in the contexts, say "No context found."

Format the answer clearly with:
1. Similarities
2. Differences
3. Information not available in the provided context

Comparison:
"""
    try:
        response = generate_llm_response(comparison_prompt)
        return {"response": response}
    except Exception:
        return {"response": "Unable to generate comparison"}