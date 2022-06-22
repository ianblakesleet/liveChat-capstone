import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import GlobalContext from '../../GlobalContext'
import styles from './CreateRoomModal.module.css'

const CreateRoomModal = ({ getAllRooms }) => {
	const [modal, setModal] = useState(false)
	const [roomName, setRoomName] = useState('')
	const [alreadyExists, setAlreadyExists] = useState(false)
	const { userId } = useContext(GlobalContext)

	const toggleModal = () => {
		setModal(!modal)
		setRoomName('')
		setAlreadyExists(false)
	}

	const createRoom = () => {
		const roomInfo = {
			room: roomName,
			id: userId,
		}
		if (roomName.length !== 0) {
			axios
				.post('http://127.0.0.1:3001/api/rooms', roomInfo)
				.then((res) => {
					console.log(res.data)
					if (res.data === 'already exists') {
						setAlreadyExists(true)
						setRoomName('')
					} else {
						getAllRooms()
						toggleModal()
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
	useEffect(() => {
		getAllRooms()
	}, [])

	return (
		<>
			<button onClick={toggleModal} className={styles.btnModal}>
				Add room
			</button>

			{modal && (
				<div className={styles.modal}>
					<div onClick={toggleModal} className={styles.overlay}></div>
					<div className={styles.modalContent}>
						<h2>Add a chat room...</h2>
						<p
							className={
								alreadyExists ? null : `${styles.hidden}`
							}
						>
							Room name already taken!
						</p>
						<input
							type="text"
							onChange={(e) => setRoomName(e.target.value)}
							value={roomName}
						/>
						<button onClick={createRoom}>Create</button>
					</div>
				</div>
			)}
		</>
	)
}

export default CreateRoomModal

// {alreadyExists && (
//   <p>Room name already taken!</p>
// )}
// {!alreadyExists && (
//   <p className={styles.hidden}>hidden</p>
// )}
