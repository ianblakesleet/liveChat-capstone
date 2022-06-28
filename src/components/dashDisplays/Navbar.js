import React, { useEffect, useState } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import CreateRoomModal from './CreateRoomModal'
import axios from 'axios'
import RoomButton from './RoomButton'
import styles from './Navbar.module.css'

const Navbar = () => {
	const [currentRoom, setCurrentRoom] = useState('')
	const [roomList, setRoomList] = useState([])
	const [toggleRooms, setToggleRooms] = useState(true)
	const { user } = useAuth0()

	const getAllRooms = () => {
		axios.get('http://127.0.0.1:3001/api/rooms').then((res) => {
			// console.log(res.data)
			setRoomList(res.data)
		})
	}
	useEffect(() => {
		getAllRooms()
	}, [])

	// setInterval(getAllRooms, 1000)

	let listDisplay = roomList.map((room, index) => {
		return (
			<RoomButton
				currentRoom={currentRoom}
				setCurrentRoom={setCurrentRoom}
				key={index}
				room={room.room_name}
				room_id={room.room_id}
			/>
		)
	})

	return (
		<nav>
			<div>{user ? `Hello ${user.nickname}` : 'please log in'}</div>
			<div>{user ? <LogoutButton /> : <LoginButton />}</div>
			{user && (
				<div>
					<div>
						<CreateRoomModal getAllRooms={getAllRooms} />
					</div>
					<div>
						<button onClick={() => setToggleRooms(!toggleRooms)}>
							Rooms
						</button>
						<ul className={toggleRooms && `${styles.hidden}`}>
							{listDisplay}
						</ul>
					</div>
				</div>
			)}
		</nav>
	)
}

export default Navbar
