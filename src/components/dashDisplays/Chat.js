import React, { useState, useEffect } from 'react'
import { socket } from '../../webSocket'
import styles from './Chat.module.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import { useContext } from 'react'
import GlobalContext from '../../GlobalContext'
import axios from 'axios'
import InputEmoji from 'react-input-emoji'

const Chat = ({ username, room }) => {
	const [currentMessage, setCurrentMessage] = useState('')
	const [messageList, setMessageList] = useState([])
	const { userId, roomNumber } = useContext(GlobalContext)

	const submitHandler = (event) => {
		// event.preventDefault()
		sendMessage()
		sendMessageToDb()
	}

	const sendMessageToDb = () => {
		//post message to db
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				full_name: username,
				message: currentMessage,
				userID: userId,
				message_time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			}
			axios
				.post(`http://localhost:3001/api/messages`, messageData)
				.then((res) => {
					// console.log(res.data)
				})
		}
	}
	const sendMessage = async () => {
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				full_name: username,
				message: currentMessage,
				userID: userId,
				message_time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			}
			await socket.emit('send_message', messageData)

			setMessageList((prevMessageList) => [
				...prevMessageList,
				messageData,
			])
			setCurrentMessage('')
		}
	}
	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((prevMessageList) => [...prevMessageList, data])
			console.log(data)
		})
	}, [socket])

	useEffect(() => {
		setMessageList([])
	}, [roomNumber])

	let dispMessages = messageList.map((mess, index) => {
		return (
			<div
				key={index}
				id={
					username === mess.full_name
						? `${styles.you}`
						: `${styles.other}`
				}
			>
				<div>
					<span className={styles.meta}>{mess.full_name}</span>
					<span className={styles.meta}>{mess.message_time}</span>
				</div>
				<div className={styles.message}>{mess.message}</div>
			</div>
		)
	})
	useEffect(() => {
		if (roomNumber !== '') {
			axios
				.get(`http://localhost:3001/api/messages/${roomNumber}`)
				.then((res) => {
					// console.log(res.data)

					setMessageList([...res.data])
				})
		}
	}, [roomNumber])

	return (
		<div className={styles.container}>
			<ScrollToBottom className={styles.chatBody}>
				{dispMessages}
			</ScrollToBottom>
			<form className={styles.chatFooter}>
				{/* <input
					className={styles.chatInput}
					type="text"
					placeholder="send message..."
					onChange={(e) => setCurrentMessage(e.target.value)}
					value={currentMessage}
				/>
				<button>&#8593;&#8593;</button> */}
				<InputEmoji
					cleanOnEnter
					borderColor="#7F8487"
					fontSize={17}
					onEnter={submitHandler}
					onChange={setCurrentMessage}
					height={100}
				/>
			</form>
		</div>
	)
}

export default Chat
