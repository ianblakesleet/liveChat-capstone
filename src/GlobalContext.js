import React, { useState, createContext } from 'react'
import { socket } from './webSocket'

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
	const [roomNumber, setRoomNumber] = useState('')
	const [username, setUserName] = useState('')
	const [userId, setUserId] = useState()
	const [roomName, setRoomName] = useState('')
	const [roomAuthor, setRoomAuthor] = useState(false)

	const changeRoom = (num) => {
		if (num !== roomNumber) {
			setRoomNumber(num)
			socket.emit('leave_room', roomNumber)
		}
	}
	const changeName = (str) => {
		setUserName(str)
	}
	const setId = (num) => {
		setUserId(num)
	}
	const changeRoomName = (str) => {
		setRoomName(str)
	}
	const changeRoomAuthor = (boolean) => {
		setRoomAuthor(boolean)
	}

	return (
		<GlobalContext.Provider
			value={{
				roomNumber,
				changeRoom,
				username,
				changeName,
				userId,
				setId,
				roomName,
				changeRoomName,
				roomAuthor,
				changeRoomAuthor,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext
