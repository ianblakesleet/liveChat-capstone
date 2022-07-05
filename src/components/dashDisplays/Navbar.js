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
	const { roomNumber, changeRoomName, roomName, reRenderCount, changeRoom } =
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

	// useEffect(() => {
	// 	socket.on('receive_message', (data) => {
	// 		console.log(data)
	// 		if (data.room == roomNumber && data.id === 999999) {
	// 			console.log('1st')
	// 			// console.log('received renaming room from other client')
	// 			changeRoomName(data.newName)
	// 			getAllRooms()
	// 		} else if (data.id === 999999) {
	// 			console.log('2nd')
	// 			getAllRooms()
	// 		} else if (data.id === 888888 && data.room == roomNumber) {
	// 			console.log('3rd')
	// 			changeRoomName('')
	// 			changeRoom('')
	// 			getAllRooms()
	// 		} else if (data.id === 888888) {
	// 			console.log('4th')
	// 			getAllRooms()
	// 		}
	// 	})
	// }, [socket])
	useEffect(() => {
		socket.on('receive_message', (data) => {
			console.log(data)
			if (data.id == 999999) {
				console.log('hit1')
				if (data.room == roomNumber) {
					changeRoomName(data.newName)
					console.log('hit 2')
				} else {
					console.log('nah')
				}
				getAllRooms()
			}
			if (data.id == 888888) {
				console.log('hit3')
				if (data.room == roomNumber) {
					changeRoomName('')
					changeRoom('')
					console.log('hit4')
				} else {
					console.log('nah')
				}
				getAllRooms()
			}
		})
		getAllRooms()
	}, [socket])

	useEffect(() => {
		getAllRooms()
		console.log('getALLROOMS NAVBAR')
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
