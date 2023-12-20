import React from 'react'
import { useRouter } from 'next/router';
import QuestionForm from '../../Components/QuestionForm'
import styles from '../../styles/Home.module.css'
function Chat() {

  const router = useRouter();
  const { id } = router.query;

  const fileName = id && id.split(":::")[0];
  const chat_id = id && id.split(":::")[1];


  return (
    <div>
      <div className={styles.title}>
          {fileName}
      </div>
      <QuestionForm filename={fileName} chat_id={chat_id}/>
    </div>
  )
}

export default Chat