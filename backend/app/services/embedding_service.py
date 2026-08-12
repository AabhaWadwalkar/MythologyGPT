from sentence_transformers import SentenceTransformer
# from dotenv import load_dotenv
# import os

model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_embedding(text:str):
    embeddings = model.encode(text)       #converts text into vectors
    return embeddings.tolist()
