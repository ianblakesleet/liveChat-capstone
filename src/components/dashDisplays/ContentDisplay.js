import React, { useContext } from 'react'
import styles from './ContentDisplay.module.css'
import Chat from './Chat'
import GlobalContext from '../../GlobalContext'

const ContentDisplay = () => {
	const { roomNumber, username, changeRoomName, roomName } =
		useContext(GlobalContext)

	return (
		<main>
			{roomNumber === '' && <h1>Please select a room...</h1>}
			{roomNumber !== '' && (
				<>
					<button onClick={() => changeRoomName('')}>
						Exit room
					</button>
					<h1>{roomName}</h1>
					<Chat username={username} room={roomNumber} />
				</>
			)}
		</main>
	)
}

export default ContentDisplay
