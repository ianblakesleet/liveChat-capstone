import React from 'react'
import { useContext } from 'react'
import { socket } from '../../webSocket'
import GlobalContext from '../../GlobalContext'
import { useEffect } from 'react'

const RoomButton = ({ room, room_id }) => {
	const { roomNumber, changeRoom, changeRoomName } = useContext(GlobalContext)

	const roomHandler = () => {
		changeRoom(room_id)
		changeRoomName(room)
	}
	useEffect(() => {
		if (roomNumber !== '') {
			socket.emit('join_room', roomNumber)
		}
	}, [roomNumber])
	return (
		<li>
			<button onClick={roomHandler}>{room}</button>
		</li>
	)
}

export default RoomButton
