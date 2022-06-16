import React, {useContext} from 'react'
import RoomContext from '../../GlobalContext'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import {useAuth0} from '@auth0/auth0-react'



const Navbar = () => {
    const {roomNumber, changeRoom} = useContext(RoomContext)

    const {user} = useAuth0()
    
    const roomHandler1 = () => {
        changeRoom('1')
    }
    const roomHandler2 = () => {
        changeRoom('2')
    }
    const roomHandler3 = () => {
        changeRoom('3')
    }
    console.log(roomNumber)
    
    if(user){
        console.log(user.nickname)
    } else{
        console.log('no user logged in')
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
                <br />
                <button onClick={roomHandler3}>Room3</button>
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