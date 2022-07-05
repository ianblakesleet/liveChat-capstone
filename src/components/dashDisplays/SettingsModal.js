import React, { useContext, useState } from 'react'
import GlobalContext from '../../GlobalContext'
import axios from 'axios'
import { AwesomeButtonProgress } from 'react-awesome-button'
import { socket } from '../../webSocket'
import styles from './SettingsModal.module.css'
import 'react-awesome-button/dist/themes/theme-blue.css'

const SettingsModal = ({ modal, setModal }) => {
	const {
		roomName,
		roomNumber,
		changeRoomName,
		changeRoom,
		changeRoomAuthor,
	} = useContext(GlobalContext)
	const [input, setInput] = useState('')
	const [newNameInput, setNewNameInput] = useState('')
	const toggleModal = () => setModal(!modal)

	const deleteRoomAxios = () => {
		axios.delete(`/api/rooms/${roomNumber}`).then((res) => {
			// console.log(res.data)
		})
	}
	const renameRoomAxios = () => {
		axios
			.put(`/api/rooms/${roomNumber}`, {
				name: newNameInput,
			})
			.then((res) => {
				console.log(res.data)
			})
	}
	const socketDeleteRoom = async () => {
		let deleteRoomMess = {
			room: roomNumber,
			message: 'deleted',
			id: 888888,
		}
		await socket.emit('send_message', deleteRoomMess)
	}
	const socketRenameRoom = async () => {
		let reRenderRooms = {
			id: 999999,
			message: 'room name changed',
			room: roomNumber,
			newName: newNameInput,
		}
		await socket.emit('send_message', reRenderRooms)
	}

	return (
		<>
			<img
				onClick={toggleModal}
				className={styles.headerBtn}
				src="https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
			></img>
			{modal && (
				<div className={styles.modal2}>
					<div
						onClick={toggleModal}
						className={styles.overlay2}
					></div>
					<div className={styles.modalContent2}>
						<div className={styles.rename}>
							<h3>Rename Room</h3>
							<input
								type="text"
								onChange={(e) =>
									setNewNameInput(e.target.value)
								}
							/>
							<AwesomeButtonProgress
								type="primary"
								size="small"
								resultLabel="Changed"
								action={(element, next) => {
									if (newNameInput.length !== 0) {
										setTimeout(() => {
											console.log('renamed!')
											next()
										}, 2000)
										setTimeout(() => {
											toggleModal()
											changeRoomName(newNameInput)
											renameRoomAxios()
											socketRenameRoom()
										}, 1000)
									}
								}}
							>
								Rename
							</AwesomeButtonProgress>
						</div>
						<hr />
						<h3>Delete Room</h3>
						<p>
							This action will{' '}
							<b>permanently destroy this room.</b>
						</p>
						<input
							type="text"
							onChange={(e) => setInput(e.target.value)}
						/>
						<AwesomeButtonProgress
							type="primary"
							size="small"
							resultLabel="Deleted"
							action={(element, next) => {
								if (roomName === input) {
									setTimeout(() => {
										// console.log('delete!')
										next()
									}, 2000)
									setTimeout(() => {
										deleteRoomAxios()
										socket.emit('leave_room', roomNumber)
										socketDeleteRoom()
										toggleModal()
										changeRoomName('')
										changeRoom('')
										changeRoomAuthor(false)
									}, 1000)
								}
							}}
						>
							Delete
						</AwesomeButtonProgress>
						<p>
							To confirm, please type the name of your room{' '}
							<b>({roomName}).</b>
						</p>
					</div>
				</div>
			)}
		</>
	)
}

export default SettingsModal
