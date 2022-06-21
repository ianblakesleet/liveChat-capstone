import React, {useContext, useEffect} from 'react'
import GlobalContext from '../../GlobalContext'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import {useAuth0} from '@auth0/auth0-react'
import {socket} from '../../webSocket'
import CreateRoomModal from './CreateRoomModal'
import axios from 'axios'
import { useState } from 'react'
import RoomButton from './RoomButton'


const Navbar = () => {
    const [roomList, setRoomList] = useState([])
    // const {roomNumber, changeRoom, username} = useContext(GlobalContext)
    const {user} = useAuth0()
    
    // const joinRoom = ()=>{
    //     if(username !== '' && roomNumber !== ''){
    //         socket.emit('join_room', roomNumber)
    //     }
    //   }
      // useEffect(()=>{
      //   // joinRoom()
      //   getAllRooms()
      // },[roomNumber])
      
     const getAllRooms = () =>{
      axios.get('http://127.0.0.1:3001/api/rooms').then((res)=>{
        console.log(res.data)
        setRoomList(res.data)
      })
     }
     useEffect(()=>{
      getAllRooms()
     },[])

    // const roomHandler1 = () => {
    //     changeRoom('1')   
    // }
    // const roomHandler2 = () => {
    //      changeRoom('2') 
    // }
   
  let listDisplay = roomList.map((room, index)=>{
    return <RoomButton key={index} room={room.room_name} room_id={room.room_id} room_author_id={room.room_author_id}/>
  })




  return (
    <nav>
        <div>
            { user? `Hello ${user.nickname}`: 'please log in' }
        </div>
        <ul>
            <li>
            { user? <LogoutButton/> : <LoginButton/> }
            </li>
            <li>
                  {/* premade test rooms
                <button onClick={roomHandler1}>Room1</button>
               
                <br />
                <button onClick={roomHandler2}>Room2</button>
                */}
            </li>
            <li>
              rooms from users/database
            <ul>
                {listDisplay}
            </ul>
            </li>
            <li>
            <CreateRoomModal/>
            </li>
            <li>
                favorites display component
            </li>
        </ul>
    </nav>
  )
}

export default Navbar