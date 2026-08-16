import json
import requests

    #1. send prompt to ollama model
    #2. receive response
    #3. return response


url = "http://localhost:11434/api/generate"

def generate_llm_response(prompt: str):
    payload = {
        "model": "llama3.2:3b",
        "prompt": prompt,
        "stream": False,
    }

    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers)
        response.raise_for_status()

        result = response.json()

        print(result.get("response","No response found"))
        return result["response"]

    except requests.exceptions.RequestException as e:
        print(f"HTTP Request failed: {e}")


if __name__=="__main__":
    result = generate_llm_response("Who is Odin?")
    print("Final Answer:", result)
   
