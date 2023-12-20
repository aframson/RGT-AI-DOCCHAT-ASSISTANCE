import React,{useEffect,useState} from 'react'
import FileUpload from '@/Components/FileUpload'
import styles from '../styles/Home.module.css'

function Home() {



  return (
    <div>
      <div className={styles.title2}>
        <div className={styles.imgbox_new}>

        </div>
        <div className={styles.ttx}>
           RGT Chat Docs AI Assistant
        </div>
      </div>
      <FileUpload />
    </div>
  )
}

export default Home