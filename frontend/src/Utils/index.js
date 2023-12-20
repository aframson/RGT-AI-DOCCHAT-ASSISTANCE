
  
import axios from 'axios';

// handle file upload and get chat id after uploading file for processing 
export const handleFileSubmit = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    console.log('processing file', file);

    try {
        const response = await axios.post('http://127.0.0.1:8000/uploadfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('response from server:', response.data.chat_id);
        window.location.href = `/chat/${response.data.chat_id}`;
        // Handle the response
    } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error
    }
};


// handle question submit and get answer from backend
export const handleQuestionSubmit = async (question, chat_id,filename) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/chat/', {
            text:question,
            chat_id,
            filename
        });

        const data = response.data;
        console.log('response:',data); // Process and display the answer
        return data;
    } catch (error) {
        console.error('Error submitting question:', error);
        // Handle error
    }
};


// get chat history from backend 
export const getChatHistory = async ()=>{
    try{
        const response = await axios.get('http://127.0.0.1:8000/gethistory'
        );
        const data = response.data;
        return data;
    } catch (error){
        console.error('Error getting chat history:', error);
    }
}