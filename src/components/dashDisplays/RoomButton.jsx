import React from 'react'
import { useContext } from 'react'
import {socket} from '../../webSocket'
import GlobalContext from '../../GlobalContext'
import { useEffect } from 'react'

const RoomButton = ({room, room_id, room_author}) => {
    const {roomNumber, changeRoom, username} = useContext(GlobalContext)
    
    const roomHandler = () =>{
        changeRoom(room_id)
    }
    useEffect(()=>{
            socket.emit('join_room', roomNumber)
    },[roomNumber])
  return (
    <li>
        <button onClick={roomHandler}>{room}</button>
    </li>
  )
}

export default RoomButton