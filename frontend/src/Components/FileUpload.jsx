import React, { useState } from 'react';
import { handleFileSubmit } from '../Utils/index';
import styles from '../styles/Home.module.css'
import ReactLoading from 'react-loading';
import docs from '../../public/1.gif'
import Image from 'next/image'


const FileUpload = () => {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const processFile = async (file) => {
    setLoading(true);
    try {
      await handleFileSubmit(file); // Assuming handleFileSubmit returns a Promise
    } catch (error) {
      console.error('Error during file upload:', error);
      // Handle the error appropriately
    }
    setLoading(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      processFile(file);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };


  return (
    <div 
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={styles.dragbox}
      style={{ border: dragging ? '2px dashed #000' : '' }}
    >
      <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="fileUpload" />
      {loading ? 
           <center>
            <ReactLoading type="spin" color="#000" height={40} width={40} />
            <div className={styles.wait}>Please wait while the file is been Processed...</div>
           </center>
          :null}
      {dragging ? 
        <div className={styles.slide}>
          <center>
              <div style={{fontSize:80}}>🤗 </div>
               <div className={styles.wait}>Drop the file here ...</div> 
          </center>

        </div>
        : 
      <div className={styles.spin}>
      
          <label htmlFor="fileUpload" style={{ cursor: 'pointer' }}>
            <div className={styles.dragshow}>
              <center>
              <div className={styles.imgbox}>
                 <Image className={styles.image} src={docs} alt="docs" width={500} height={500} />
              </div>
              <div className={styles.dragtxt}>
                 Drag and drop a file here, or click to select a file to start the conversation
              </div>
              </center>
            </div>
          </label>
          
  
      </div>
      }
    </div>
  );
};

export default FileUpload;
