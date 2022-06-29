import React from 'react'
import { useContext, useState } from 'react'
import { socket } from '../../webSocket'
import GlobalContext from '../../GlobalContext'
import { useEffect } from 'react'
import styles from './RoomButton.module.css'

const RoomButton = ({ room, room_id, setCurrentRoom, room_author_id }) => {
	const {
		roomNumber,
		changeRoom,
		changeRoomName,
		roomName,
		userId,
		changeRoomAuthor,
	} = useContext(GlobalContext)

	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		if (room !== roomName) {
			setIsActive(false)
		}
	}, [roomName])

	const roomHandler = () => {
		socket.emit('leave_room', roomNumber)
		changeRoom(room_id)
		changeRoomName(room)
		setIsActive(true)
		if (room_author_id === userId) {
			changeRoomAuthor(true)
		} else {
			changeRoomAuthor(false)
		}
	}
	useEffect(() => {
		socket.emit('join_room', roomNumber)
	}, [roomNumber])
	return (
		<li>
			<button
				className={isActive ? `${styles.active}` : `${styles.roomBtn}`}
				onClick={roomHandler}
			>
				{room}
			</button>
		</li>
	)
}

export default RoomButton
