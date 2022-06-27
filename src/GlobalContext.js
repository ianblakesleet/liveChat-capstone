import React, { useState, createContext } from 'react'

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
	const [roomNumber, setRoomNumber] = useState('')
	const [username, setUserName] = useState('')
	const [userId, setUserId] = useState()
	const [roomName, setRoomName] = useState('')

	const changeRoom = (num) => {
		setRoomNumber(num)
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
	console.log(roomNumber)

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
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext
