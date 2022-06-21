import React, { useState, createContext } from 'react'

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [roomNumber, setRoomNumber] = useState('')
  const [username, setUserName] = useState('default')
  const [userId, setUserId] = useState()

  const changeRoom = num => {
    setRoomNumber(num)
  }
  const changeName = str => {
    setUserName(str)
  }
  const setId = num => {
    setUserId(num)
  }

  return (
    <GlobalContext.Provider
      value={{ roomNumber, changeRoom, username, changeName, userId, setId }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
