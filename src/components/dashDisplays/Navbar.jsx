import React, {useContext, useEffect} from 'react'
import RoomContext from '../../GlobalContext'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import {useAuth0} from '@auth0/auth0-react'
import {socket} from '../../webSocket'


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
   
    // console.log(`changed to room: ${roomNumber}!!`)
    
    // if(user){
    //     console.log(user)
    // } else{
    //     console.log('no user logged in')
    // }


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
               
                <br />
                <button>+</button>
                this is create room button
            </li>
            <li>
                favorites display component
            </li>
            <li>
                logout button
            </li>
        </ul>
    </nav>
  )
}

export default Navbar