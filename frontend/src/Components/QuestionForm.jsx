import React, { useState,useRef,useEffect } from 'react';
import { handleQuestionSubmit } from '../Utils/index';
import styles from '../styles/Home.module.css'
import { IoMdArrowRoundUp } from "react-icons/io";
import history from '../../public/3.gif'
import Image from 'next/image'
import ReactLoading from 'react-loading';
import { FaRegUserCircle } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { motion } from 'framer-motion';
import { Modal } from 'react-responsive-modal';
import { FaRegThumbsUp,FaRegThumbsDown} from "react-icons/fa6";



const QuestionForm = ({ chat_id, filename }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [qaHistory, setQaHistory] = useState([]); // State to store question-answer history
  const chatContainerRef = useRef(null); 
  const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Assuming handleQuestionSubmit now returns the answer
      const data = await handleQuestionSubmit(question, chat_id, filename);
      
      // Append the new question-answer pair to the history
      setQaHistory(prevQaHistory => [...prevQaHistory, { question, answer: data.answer }]);
    } catch (error) {
      console.error('Error submitting question:', error);
      // Handle error appropriately
    }

    setQuestion('');
    setLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo(0, scrollHeight - clientHeight);
    }
  }, [qaHistory]); 

  return (
    <div >
        <Modal 
     styles={{
            modal: {
                maxWidth: '500px',
                // width: '40vw',
                padding: '40px',
                borderRadius: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            },

            
     }} 
     open={open} onClose={onCloseModal} center>
        <h2 className={styles.ph}>Feedback</h2>
        <p className={styles.pp}>
          This is supposed to send feedback to the server side for model improvement and fintuning 
        </p>
      </Modal>
        <div  ref={chatContainerRef}  className={styles.historybox}>

        {qaHistory.length === 0 && <div>
          <center>
            <div className={styles.historyimage}>
              <Image width={500} height={500} className={styles.hisimage} src={history} alt="history" />
            </div>
          </center>
        </div>}
        {qaHistory.map((qa, index) => (
          <motion.div 
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
            className={styles.chatbox} 
            key={index}>
            <div id={styles.cb} className={styles.user}>
              <div className={styles.ai}>
                <FaRegUserCircle size={30} color='black' />
              </div>
              <div className={styles.message}>{qa.question}</div>
            </div>
            <div  id={styles.cb} className={styles.ai}>
              <div className={styles.ai}>
                <IoSparkles size={30} color='blueviolet' />
              </div>
              <div className={styles.message}>{qa.answer}</div>
            </div>
            <div className={styles.feed}>
              <div className={styles.feedline}>
                <button onClick={()=>setOpen(!open)} className={styles.feedbutton}>
                  <FaRegThumbsUp size={20} color='black' />
                </button>
                <button onClick={()=>setOpen(!open)} className={styles.feedbutton}>
                  <FaRegThumbsDown size={20} color='black' />
                </button>
              </div>
            </div>
          </motion.div >
        ))}
      </div>
      <di className={styles.inputfooter}>
        <form className={styles.inbox} onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question"
            disabled={loading}
            className={styles.input}
          />
          <button className={styles.go} type="submit" disabled={loading}>
            {loading?(
              <center>
                <ReactLoading type="spin" color="white" height={25} width={25} />
              </center>
            ):
            <IoMdArrowRoundUp  size={24} color='white' />
            }
          </button>
        </form>
        <center>
          <div className={styles.fortherecord}>This is an Assignment by RGT resposnes are produced by a Large Language Model</div>
        </center>
      </di>
    
    </div>
  );
};

export default QuestionForm;
