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
    You are a mythology comparison assistant for a closed-domain knowledge system.

    Compare {god1} and {god2} using ONLY the factual information explicitly provided in the contexts below.

    God 1: {god1}
    Context:
    {ans1}

    God 2: {god2}
    Context:
    {ans2}

    STRICT RULES:
    1. The provided contexts are your ONLY source of factual information.
    2. Do NOT use pretrained knowledge, outside knowledge, or common mythology knowledge.
    3. Do NOT invent, assume, infer, or add facts that are not explicitly stated in the contexts.
    4. Compare the gods only using information directly supported by their contexts.
    5. You may combine multiple facts from the same context when doing so does not introduce a new fact.
    6. Clearly identify similarities and differences only when supported by the contexts.
    7. Compare these aspects when information is available:
    - Role
    - Powers and abilities
    - Major stories or events
    - Other relevant information explicitly mentioned in the contexts
    8. If an aspect is available for one god but not the other, state that the information is not available for the other god.
    9. Do not claim that information is unavailable merely because the context does not provide additional details or explanations.
    10. If there is not enough information to make a particular comparison, state:
    "Not enough context available for this comparison."
    11. Do not include unrelated information.
    12. Do not describe your reasoning process.

    Format the answer as:

    **Similarities:**
    - ...

    **Differences:**
    - ...

    Only include an "Information not available" section if genuinely relevant information is missing from one or both contexts.

    Before answering, verify that every factual statement is directly supported by the provided contexts.

    Comparison:
"""
#     comparison_prompt = f"""
# You are a mythology comparison assistant.

# Compare {god1} and {god2} using ONLY the information explicitly provided in the contexts below.

# God 1: {god1}
# Context for {god1}:
# {ans1}

# God 2: {god2}
# Context for {god2}:
# {ans2}

# Instructions:
# - Use ONLY the information explicitly stated in the provided contexts.
# - Every statement in your comparison must be directly supported by the provided context.
# - Do not use outside knowledge.
# - Do not invent, assume, infer, interpret, or add facts that are not explicitly stated.
# - Do not combine separate facts to create a conclusion that is not directly supported by the context.
# - Clearly identify similarities and differences only when they are explicitly supported by the contexts.
# - Compare the following aspects when information is available:
#   1. Role
#   2. Powers and abilities
#   3. Major stories or events
#   4. Other relevant information explicitly mentioned in the contexts
# - If information about an aspect is available for one god but not the other, state that the information is not available in the provided context for the other god.
# - If the contexts do not contain enough information for a particular comparison, do not guess. State "Not enough context available for this comparison."
# - If there is no useful information in the contexts, say "No context found."

# Format the answer clearly with:
# 1. Similarities
# 2. Differences
# 3. Information not available in the provided context

# Comparison:
# """
    try:
        response = generate_llm_response(comparison_prompt)
        return {"response": response}
    except Exception:
        return {"response": "Unable to generate comparison"}