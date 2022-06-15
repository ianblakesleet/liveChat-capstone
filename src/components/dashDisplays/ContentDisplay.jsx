import React, { useState } from 'react'
import styles from './ContentDisplay.module.css'
import Chat from './Chat'
// import io from 'socket.io-client'
// const socket = io.connect('http://localhost:3001')
import {socket} from '../../webSocket'

const ContentDisplay = () => {

  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  
  const joinRoom = ()=>{
    if(username !== '' && room !== ''){
      socket.emit('join_room', room)
    }
  }
  return (
    <main> 
     
      <input type="text" placeholder='name...'
      onChange={(e)=>setUsername(e.target.value)}
      />
      <input type="text" placeholder='room id...'
      onChange={(e)=>setRoom(e.target.value)}
      />
      {/* <button onClick={sendMessage}>send</button>  */}
      <button onClick={joinRoom}>send</button> 
      <h1>Message:</h1>
      <Chat socket={socket} username={username} room={room}/>
      </main>
  )
}

export default ContentDisplay