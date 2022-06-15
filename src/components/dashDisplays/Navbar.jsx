import React, {useContext} from 'react'
import RoomContext from '../RoomContext'


const Navbar = () => {
    const {roomNumber, changeRoom} = useContext(RoomContext)

 
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
  return (
    <nav>
        <ul>
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