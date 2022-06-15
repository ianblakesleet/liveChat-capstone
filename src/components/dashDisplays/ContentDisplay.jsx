import React, { useState, useContext } from 'react'
import styles from './ContentDisplay.module.css'
import Chat from './Chat'
//websocket module import
import { socket } from '../../webSocket'
import RoomContext from '../RoomContext'



const ContentDisplay = () => {

  const [username, setUsername] = useState('')
  const {roomNumber, setRoomNumber} = useContext(RoomContext)


  
  const joinRoom = ()=>{
    if(username !== '' && roomNumber !== ''){
      socket.emit('join_room', roomNumber)
    }
  }



  return (
    <main> 
     
      <input type="text" placeholder='name...'
      onChange={(e)=>setUsername(e.target.value)}
      />
    
      <button onClick={joinRoom}>send</button> 
      <h1>Message:</h1>
      <Chat username={username} room={roomNumber}/>
      </main>
  )
}

export default ContentDisplay