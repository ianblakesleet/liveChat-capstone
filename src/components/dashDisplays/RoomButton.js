import React from 'react'
import { useContext, useState } from 'react'
import { socket } from '../../webSocket'
import GlobalContext from '../../GlobalContext'
import { useEffect } from 'react'
import styles from './RoomButton.module.css'

const RoomButton = ({ room, room_id, room_author_id }) => {
	const {
		roomNumber,
		changeRoom,
		changeRoomName,
		roomName,
		userId,
		changeRoomAuthor,
	} = useContext(GlobalContext)

	const [isActive, setIsActive] = useState(true)

	const roomHandler = () => {
		changeRoom(room_id)
		changeRoomName(room)
		setIsActive(true)
		room_author_id === userId
			? changeRoomAuthor(true)
			: changeRoomAuthor(false)
	}
	useEffect(() => {
		if (room !== roomName) {
			setIsActive(false)
		}
	}, [roomName])

	useEffect(() => {
		if (room_id == roomNumber) {
			setIsActive(true)
		}
		console.log('*roombutton*')
	})

	useEffect(() => {
		socket.emit('join_room', roomNumber)
	}, [roomNumber])
	return (
		<li>
			<button
				className={isActive ? `${styles.active}` : `${styles.roomBtn}`}
				onClick={roomHandler}
			>
				{/* {room} */}
				{room_author_id === userId ? `${room}  👑` : `${room}`}
			</button>
		</li>
	)
}

export default RoomButton
