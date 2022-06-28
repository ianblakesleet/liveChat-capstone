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
					<div className={styles.chatHeader}>
						<img
							className={styles.exitBtn}
							// src="https://cdn-icons-png.flaticon.com/512/3094/3094700.png"
							src="https://cdn-icons-png.flaticon.com/512/3094/3094628.png"
							onClick={exitRoomHandler}
						></img>
						<h1>{roomName}</h1>
					</div>
					<Chat username={username} room={roomNumber} />
				</>
			)}
		</main>
	)
}

export default ContentDisplay
