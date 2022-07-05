import React, { useEffect, useState, useContext } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import CreateRoomModal from './CreateRoomModal'
import axios from 'axios'
import RoomButton from './RoomButton'
import styles from './Navbar.module.css'
import GlobalContext from '../../GlobalContext'
import { socket } from '../../webSocket'

const Navbar = () => {
	const [roomList, setRoomList] = useState([])
	const [toggleRooms, setToggleRooms] = useState(true)
	const { user } = useAuth0()
	const { roomNumber, changeRoomName, roomName, reRenderCount } =
		useContext(GlobalContext)

	const getAllRooms = () => {
		axios.get('/api/rooms').then((res) => {
			// console.log(res.data)
			setRoomList(res.data)
		})
	}
	useEffect(() => {
		getAllRooms()
	}, [])

	useEffect(() => {
		//when other client creates room or edits room name, will re-render new list
		socket.on('receive_message', (data) => {
			if (data.id === 999999) {
				getAllRooms()
				//this checks if you are currently in the room that name is chaning & updates it
				if (data.room === roomNumber) {
					changeRoomName(data.newName)
				}
			}
		})
		//when other client deletes room, rerenders list
		socket.on('receive_message', (data) => {
			if (data.id === 888888) {
				getAllRooms()
			}
		})
	}, [socket])

	useEffect(() => {
		getAllRooms()
	}, [reRenderCount, roomName, roomNumber])

	let listDisplay = roomList.map((room, index) => {
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
