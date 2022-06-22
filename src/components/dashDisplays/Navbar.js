import React, { useEffect } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import CreateRoomModal from './CreateRoomModal'
import axios from 'axios'
import { useState } from 'react'
import RoomButton from './RoomButton'

const Navbar = () => {
	const [roomList, setRoomList] = useState([])
	const { user } = useAuth0()
	// console.log(user)

	const getAllRooms = () => {
		axios.get('http://127.0.0.1:3001/api/rooms').then((res) => {
			// console.log(res.data)
			setRoomList(res.data)
		})
	}
	useEffect(() => {
		getAllRooms()
	}, [])

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
			<div>{user ? `Hello ${user.nickname}` : 'please log in'}</div>
			<div>{user ? <LogoutButton /> : <LoginButton />}</div>
			{user && (
				<div>
					<h2>rooms</h2>
					<ul>{listDisplay}</ul>
					<div>
						<CreateRoomModal getAllRooms={getAllRooms} />
					</div>
				</div>
			)}
		</nav>
	)
}

export default Navbar
