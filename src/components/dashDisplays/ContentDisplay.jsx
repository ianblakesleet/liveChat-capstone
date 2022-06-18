import React, { useState, useContext } from 'react'
import styles from './ContentDisplay.module.css'
import Chat from './Chat'
//websocket module import
import { socket } from '../../webSocket'
import GlobalContext from '../../GlobalContext'

const ContentDisplay = () => {

  const {roomNumber, username} = useContext(GlobalContext)



  return (
    <main> 

      <h1>Message:</h1>
      <Chat username={username} room={roomNumber}/>
      </main>
  )
}

export default ContentDisplay