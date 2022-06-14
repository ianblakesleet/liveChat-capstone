import React, { useEffect, useState } from 'react'
import styles from './ContentDisplay.module.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

const ContentDisplay = () => {
  const [message, setMessage] = useState('')

  const [messDisplay, setMessDisplay] = useState("")
  
  const sendMessage = ()=>{
    socket.emit("send_message", {message})
  }
  
  useEffect(()=>{
    socket.on('receive_message', (data)=>{
      setMessDisplay(data.message)
    })
  }, [socket])
  
  
  return (
    <main> 
      <input type="text" placeholder='Message...'
      onChange={(e)=>setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>send</button> 
      <h1>Message:</h1>
      {messDisplay}
      </main>
  )
}

export default ContentDisplay