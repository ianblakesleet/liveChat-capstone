import React, { useContext, useState } from 'react'
import styles from './ContentDisplay.module.css'
import Chat from './Chat'
import GlobalContext from '../../GlobalContext'
import { socket } from '../../webSocket'
import { useAuth0 } from '@auth0/auth0-react'
import SettingsModal from './SettingsModal'

const ContentDisplay = () => {
	const [modal, setModal] = useState(false)
	const toggleModal = () => {
		setModal(!modal)
	}
	const { user } = useAuth0()
	const {
		roomNumber,
		username,
		changeRoomName,
		roomName,
		changeRoom,
		changeRoomAuthor,
		roomAuthor,
	} = useContext(GlobalContext)

	const exitRoomHandler = () => {
		socket.emit('leave_room', roomNumber)
		changeRoomName('')
		changeRoom('')
		changeRoomAuthor(false)
	}
	let welcomeMessage = ''
	if (user && roomNumber === '') {
		welcomeMessage = 'Please select a room...'
	} else if (!user) {
		welcomeMessage = 'Please login to use chat rooms!'
	}
	return (
		<main>
			<h1>{welcomeMessage}</h1>
			{/* {roomNumber === '' && <h1>Please select a room...</h1>} */}
			{roomNumber !== '' && (
				<>
					<div className={styles.chatHeader}>
						<img
							className={styles.exitBtn}
							// src="https://cdn-icons-png.flaticon.com/512/3094/3094700.png"
							// src="https://cdn-icons-png.flaticon.com/512/3094/3094628.png"
							src="https://cdn-icons-png.flaticon.com/512/1286/1286853.png"
							onClick={exitRoomHandler}
						></img>
						<h1>{roomName}</h1>
						{roomAuthor ? (
							<SettingsModal modal={modal} setModal={setModal} />
						) : (
							<span></span>
						)}
						{/* {roomAuthor ? (
							<img
								className={styles.headerBtn}
								src="https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
							></img>
						) : (
							<span></span>
						)} */}
					</div>
					<Chat username={username} room={roomNumber} />
				</>
			)}
		</main>
	)
}

export default ContentDisplay
