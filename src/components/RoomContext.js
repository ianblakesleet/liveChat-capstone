import React, { useState, createContext } from 'react'

const RoomContext = createContext()

export function RoomProvider({ children }) {
  const [roomNumber, setRoomNumber] = useState('')

  const changeRoom = num => {
    setRoomNumber(num)
  }

  return (
    <RoomContext.Provider value={{ roomNumber, changeRoom }}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext

//import RoomContext from '../RoomContext'
//const {roomNumber, setRoomNumber} = useContext(RoomContext)
