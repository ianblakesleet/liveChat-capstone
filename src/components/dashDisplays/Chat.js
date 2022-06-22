import React, { useState, useEffect } from 'react'
import { socket } from '../../webSocket'
import styles from './Chat.module.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import { useContext } from 'react'
import GlobalContext from '../../GlobalContext'

const Chat = ({ username, room }) => {
	const [currentMessage, setCurrentMessage] = useState('')
	const [messageList, setMessageList] = useState([])
	const { roomNumber } = useContext(GlobalContext)

	const sendMessage = async () => {
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
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

	//this functions listens to a receive_message event and adds it to message list array. socket is a dependecy.
	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((prevMessageList) => [...prevMessageList, data])
			console.log(data.message)
		})
	}, [socket])

	//on room change, will clear displayed chats from screen
	useEffect(() => {
		setMessageList([])
	}, [roomNumber])

	let dispMessages = messageList.map((mess, index) => {
		return (
			<div
				key={index}
				id={
					username === mess.author
						? `${styles.you}`
						: `${styles.other}`
				}
			>
				<div className={styles.messageMeta}>
					<span className={styles.meta}>{mess.author}</span>
					<span className={styles.meta}>{mess.time}</span>
					<span className={styles.meta}>{mess.room}</span>
				</div>
				<div className={styles.message}>{mess.message}</div>
			</div>
		)
	})

	return (
		<div className={styles.container}>
			<ScrollToBottom className={styles.chatBody}>
				{dispMessages}
			</ScrollToBottom>
			<div className={styles.chatFooter}>
				<input
					type="text"
					placeholder="send message..."
					onChange={(e) => setCurrentMessage(e.target.value)}
					value={currentMessage}
					onKeyPress={(e) => {
						e.key === 'Enter' && sendMessage()
					}}
				/>
				<button onClick={sendMessage}>&#8593;</button>
			</div>
		</div>
	)
}

export default Chat
