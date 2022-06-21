import React from 'react'
import { useState } from 'react'
import styles from './CreateRoomModal.module.css'

const CreateRoomModal = () => {
    const [modal, setModal] = useState(false)
    const toggleModal = () =>{
        setModal(!modal)
    }
 
    return (
    <>
        <button onClick={toggleModal} className={styles.btnModal}>
        Add room
      </button>

      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modalContent}>
            <h2>Add a chat room...</h2>
            <input type="text" />
            <button onClick={toggleModal}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateRoomModal