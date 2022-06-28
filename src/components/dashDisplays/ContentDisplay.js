import React, { useContext } from 'react'
import styles from './ContentDisplay.module.css'
import Chat from './Chat'
import GlobalContext from '../../GlobalContext'
import { socket } from '../../webSocket'

const ContentDisplay = () => {
	const { roomNumber, username, changeRoomName, roomName, changeRoom } =
		useContext(GlobalContext)

	const exitRoomHandler = () => {
		socket.emit('leave_room', roomNumber)
		changeRoomName('')
		changeRoom('')
	}
	return (
		<main>
			{roomNumber === '' && <h1>Please select a room...</h1>}
			{roomNumber !== '' && (
				<>
					<button
						onClick={exitRoomHandler}
						className={styles.exitBtn}
					>
						X
					</button>
					<h1>{roomName}</h1>
					<Chat username={username} room={roomNumber} />
				</>
			)}
		</main>
	)
}

export default ContentDisplay
