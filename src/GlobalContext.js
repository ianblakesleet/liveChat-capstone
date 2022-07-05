import React, { useState, createContext } from 'react'
import { socket } from './webSocket'

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
	const [roomNumber, setRoomNumber] = useState('')
	const [username, setUserName] = useState('')
	const [userId, setUserId] = useState()
	const [roomName, setRoomName] = useState('')
	const [roomAuthor, setRoomAuthor] = useState(false)
	const [reRenderCount, setReRenderCount] = useState(0)

	const changeRoom = (num) => {
		//prevents leave room event if you double click room button
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
	const addToCount = () => {
		setReRenderCount(reRenderCount + 1)
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
				addToCount,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext
