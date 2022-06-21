import React, {useContext, useEffect} from 'react'
import RoomContext from '../../GlobalContext'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import {useAuth0} from '@auth0/auth0-react'
import {socket} from '../../webSocket'
import CreateRoomModal from './CreateRoomModal'


const Navbar = () => {
    const {roomNumber, changeRoom, username} = useContext(RoomContext)
    const {user} = useAuth0()
    
    const joinRoom = ()=>{
        if(username !== '' && roomNumber !== ''){
            socket.emit('join_room', roomNumber)
        }
      }

      useEffect(()=>{
        joinRoom()
      },[roomNumber])

    const roomHandler1 = () => {
        changeRoom('1')   
    }
    const roomHandler2 = () => {
         changeRoom('2') 
    }
   
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
                <button onClick={roomHandler1}>Room1</button>
               
                <br />
                <button onClick={roomHandler2}>Room2</button>
               
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