import React from 'react'
import { useContext, useState } from 'react'
import { socket } from '../../webSocket'
import GlobalContext from '../../GlobalContext'
import { useEffect } from 'react'
import styles from './RoomButton.module.css'

const RoomButton = ({ room, room_id, setCurrentRoom }) => {
	const { roomNumber, changeRoom, changeRoomName, roomName } =
		useContext(GlobalContext)

	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		if (room !== roomName) {
			setIsActive(false)
		}
	}, [roomName])

	const roomHandler = () => {
		socket.emit('leave_room', roomNumber)
		setCurrentRoom(room_id)
		changeRoom(room_id)
		changeRoomName(room)
		setIsActive(true)
	}
	useEffect(() => {
		socket.emit('join_room', roomNumber)
	}, [roomNumber])
	return (
		<li>
			<button
				className={isActive ? `${styles.active}` : null}
				onClick={roomHandler}
			>
				{room}
			</button>
		</li>
	)
}

export default RoomButton
