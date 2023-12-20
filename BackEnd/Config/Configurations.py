from dotenv import load_dotenv
import os
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI

load_dotenv()  

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
FILE_DIR='./VectorStore/'
PERSIST_DIRECTORY = f'{FILE_DIR}'
CHUNK_SIZE = 550
CHUNK_OVERLAP = 15
TEMPERATURE = 0.8
MAX_TOKENS = 200

llm = OpenAI(
    api_key=OPENAI_API_KEY,
    max_tokens=MAX_TOKENS,
    temperature=TEMPERATURE,
)
embeddings = OpenAIEmbeddings(
    api_key=OPENAI_API_KEY,
)
