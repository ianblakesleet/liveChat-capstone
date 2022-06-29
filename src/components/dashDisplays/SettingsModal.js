import React, { useContext, useState } from 'react'
import GlobalContext from '../../GlobalContext'
import axios from 'axios'
import { AwesomeButtonProgress } from 'react-awesome-button'
import styles from './SettingsModal.module.css'
import 'react-awesome-button/dist/themes/theme-blue.css'

const SettingsModal = ({ modal, setModal }) => {
	const { roomName, roomNumber } = useContext(GlobalContext)
	const [input, setInput] = useState('')

	const toggleModal = () => setModal(!modal)
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
										console.log('delete!')
										next()
									}, 2000)
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
