from dotenv import load_dotenv
import os
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI
load_dotenv()  

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')  # this is to get the OPENAI API key form the .env file
FILE_DIR='./VectorStore/' # this is the directory which the vector embeddings are stored 
PERSIST_DIRECTORY = f'{FILE_DIR}' # the defined directory is passed in the ChromaDB for storage persistence
CHUNK_SIZE = 550 # split the text into chunks of 550 characters
CHUNK_OVERLAP = 15 # overlap the chunks by 15 characters
TEMPERATURE = 0.8 # the temperature of the model for creativity
MAX_TOKENS = 200 # the maximum number of tokens to generate

# the OpenAI LLM and Embeddings objects
llm = OpenAI(
    api_key=OPENAI_API_KEY,
    max_tokens=MAX_TOKENS,
    temperature=TEMPERATURE,
)
# the OpenAI Embeddings object
embeddings = OpenAIEmbeddings(
    api_key=OPENAI_API_KEY,
)
