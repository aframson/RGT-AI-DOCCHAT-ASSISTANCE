import React from 'react'
import styles from '../styles/Home.module.css'
import Navbar from './Navbar'
function AppLayout({children}) {
  return (
    <div className={styles.sidebar} >
        <Navbar/>
        {children}
    </div>
  )
}

export default AppLayout