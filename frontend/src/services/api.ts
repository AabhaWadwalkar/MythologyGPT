import type { AskResponse } from "../types/ask";
import type { CompareResponse } from "../types/compare";
import type {God} from "../types/god";
import type { GraphResponse } from "../types/graph";
import type { StoryResponse } from "../types/story";

export async function askQuestion(question:string): Promise<AskResponse>{
    const response = await fetch("http://localhost:8000/ask",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({question}),
    });
    const data = await response.json();
    return data;
}

export async function getGods(name: string): Promise<God>{
    const response = await fetch(`http://localhost:8000/god/${name}`, {
        method: "GET",
    });
    const data = await response.json();
    return data;
}

export async function compareGods(god1: string, god2: string): Promise<CompareResponse>{
    const response = await fetch("http://localhost:8000/compare_gods", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({god1,god2}),
    });
    const data = await response.json();
    return data; 
}

export async function storyGods(topic : string): Promise<StoryResponse>{
    const response = await fetch("http://localhost:8000/story", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({topic}),
    });
    const data = await response.json();
    return data;
}

export async function graphGods():Promise<GraphResponse> {
    const response = await fetch("http://localhost:8000/graph",{
        method: "GET"
    });
    const data = await response.json();
    return data;
    
}