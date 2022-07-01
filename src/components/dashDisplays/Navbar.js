import React, { useEffect, useState } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import CreateRoomModal from './CreateRoomModal'
import axios from 'axios'
import RoomButton from './RoomButton'
import styles from './Navbar.module.css'
import { useContext } from 'react'
import GlobalContext from '../../GlobalContext'

const Navbar = () => {
	// const [currentRoom, setCurrentRoom] = useState('')
	const [roomList, setRoomList] = useState([])
	const [toggleRooms, setToggleRooms] = useState(true)
	const { user } = useAuth0()
	const { roomNumber } = useContext(GlobalContext)

	const getAllRooms = () => {
		axios.get('http://127.0.0.1:3001/api/rooms').then((res) => {
			console.log(res.data)
			setRoomList(res.data)
		})
	}
	useEffect(() => {
		getAllRooms()
	}, [])

	useEffect(() => {
		getAllRooms()
	}, [roomNumber])

	let listDisplay = roomList.map((room, index) => {
		console.log(room)
		return (
			<RoomButton
				key={index}
				room={room.room_name}
				room_id={room.room_id}
				room_author_id={room.room_author_id}
			/>
		)
	})

	return (
		<nav>
			<div className={styles.userWelcome}>
				{user ? `Hello ${user.nickname}` : null}
			</div>
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
						<ul className={toggleRooms ? `${styles.hidden}` : null}>
							{listDisplay}
						</ul>
					</div>
				</div>
			)}
		</nav>
	)
}

export default Navbar
