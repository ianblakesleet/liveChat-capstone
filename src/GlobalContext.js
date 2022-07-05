import React, { useState, createContext } from 'react'
import { socket } from './webSocket'

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
	const [roomNumber, setRoomNumber] = useState('')
	const [username, setUserName] = useState('')
	const [userId, setUserId] = useState()
	const [roomName, setRoomName] = useState('')
	const [roomAuthor, setRoomAuthor] = useState(false)

	//when a user deletes THEIR room, for some reason the useEffect wouldnt fire on roomname and roomnumber change, adding this on state variable on delete seems to fire that useEffect. **
	const [reRenderCount, setReRenderCount] = useState(0)
	const addToCount = () => {
		setReRenderCount(reRenderCount + 1)
	}

	const changeRoom = (num) => {
		//prevents leave room event if you double click room button
		if (num !== roomNumber) {
			socket.emit('leave_room', roomNumber)
			setRoomNumber(num)
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
				addToCount,
				reRenderCount,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext
