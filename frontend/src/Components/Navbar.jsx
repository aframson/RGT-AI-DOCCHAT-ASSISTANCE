import React,{useEffect,useState} from 'react'
import styles from '../styles/Home.module.css'
import {getChatHistory} from '../Utils/index'
import { TiDocumentText } from "react-icons/ti";
import { useRouter } from 'next/router';
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";

function Navbar() {

    const [history, setHistory] = useState([]); // State to store question-answer history
    const router = useRouter();
    const [width, setWidth] = useState(false);

    useEffect(() =>{
        (async()=>{
          const history = await getChatHistory();
          console.log('history',history);
          setHistory(history?.history_data || []);
        })()
      },[])

    //   function to reduce the text length and replace it witb ...
    const reduceTextLength = (text) =>{
        if(text.length > 20){
            return text.slice(0,20) + '...'
        }
        return text
    }

    
  return (
    <div style={{marginLeft:width?'0':'-15vw'}} className={styles.navcontainer}>
         <button onClick={()=>setWidth(!width)} className={styles.slidebar}>
                <HiOutlineArrowsRightLeft color='black' size={30}/>
         </button>
        <div className={styles.navbar}>
        {history && history.map((chat) => (
            <a href={`/chat/${chat}`} className={styles.navbarlink}>
            <div className={styles.navbartxt}>
               <TiDocumentText color='white' size={22}/>
               <div className={styles.txtdoc}> {reduceTextLength(chat.split(":::")[0])} </div>
            </div>
            </a>
        ))}
        </div>
    </div>
  )
}

export default Navbar