from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from Utils.function import process_data_upload ,process_chat_data
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, HTTPException
import PyPDF2
import io
import uuid
import csv
import os

app = FastAPI()
origins = [
    "http://127.0.0.1",
    "http://127.0.0.1:8000/",  # Add the frontend's URL here
    # Add more allowed origins if needed
    "*"
]


# 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...)):
    # Determine the file type
    filename = file.filename
    content_type = file.content_type
    chat_ids = filename+":::"+str(uuid.uuid4())

    # Process based on file type
    if content_type == 'application/pdf':
        # PDF file processing
        content = await file.read()
        buffer = io.BytesIO(content)
        reader = PyPDF2.PdfReader(buffer)
        text_data = ""
        for page in reader.pages:
            text_data += page.extract_text() + "\n"
    elif content_type == 'text/plain':
        # Text file processing
        content = await file.read()
        text_data = content.decode("utf-8")
    elif file.content_type == 'text/csv':
        # Read and decode the CSV file content
        content = await file.read()
        decoded_content = content.decode("utf-8")
        file_content = io.StringIO(decoded_content)
        csv_reader = csv.reader(file_content, delimiter=',')

        text_data = ""
        for row in csv_reader:
            text_data += ",".join(row) + "\n"
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {content_type}")

    # Process the text data
    return process_data_upload(text_data, chat_ids)



class QuestionRequest(BaseModel):
    text: str
    chat_id: str  # or str, depending on what `idx` represents
    filename:str

@app.post("/chat/")
async def process_text(request: QuestionRequest):
     # Extract text and chatid from the request
    text = request.text
    chat_id = request.chat_id
    filename = request.filename

    return process_chat_data(text,chat_id,filename)  # Replace with your processing function



@app.get("/gethistory")
async def get_folder_names():
    # Convert URL-encoded path to filesystem path
    folder_path = os.path.normpath('./VectorStore/')

    # Check if the path exists and is a directory
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        raise HTTPException(status_code=404, detail="Folder not found")

    # List directories in the given folder
    try:
        folder_names = [name for name in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, name))]
        data = {
            "status":True,
            "history_data":folder_names
        }
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

