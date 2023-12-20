
# import neccesesary files 
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from Config.Configurations import CHUNK_SIZE, CHUNK_OVERLAP, PERSIST_DIRECTORY, embeddings ,llm
from PromptTemplate.template import Template
from langchain.chains import  RetrievalQA


# function to process the data upload
def process_data_upload(content:str,chat_id:str):
    # split the text into chunks of 550 characters
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE,chunk_overlap=CHUNK_OVERLAP)
    text_chunks = text_splitter.create_documents([content])

    print(f"Split into {len(text_chunks)} chunks of text")
    vectorstore_embedding = Chroma.from_documents(text_chunks, embeddings, persist_directory=PERSIST_DIRECTORY+chat_id)
    if vectorstore_embedding:
        data = {
            "status":True,
            "chat_id":chat_id,
            "message":"Data has been processed , Embeddings stored sucessfully"
        }
        return data
    else:
        data = {
            "status":False,
            "chat_id":None,
            "message":"Data has not been processed , Embeddings not stored sucessfully"
        }
        return data
    



# function to process the chat data
def process_chat_data(text,idx,filename):
    # split the text into chunks of 550 characters
    vector_embeddings = Chroma(persist_directory=PERSIST_DIRECTORY+filename+":::"+idx, embedding_function=embeddings)

    conversation_chain =  RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=vector_embeddings.as_retriever(), return_source_documents=True)
    conversation_chain.combine_documents_chain.llm_chain.prompt.template = Template
    response = conversation_chain(text)
    question , answer , drafts = response['query'],response['result'] ,response['source_documents']

    return {"question": question, "answer": answer, "drafts": drafts}
