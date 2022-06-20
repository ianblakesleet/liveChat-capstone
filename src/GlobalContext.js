import React, { useState, createContext } from 'react'

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [roomNumber, setRoomNumber] = useState('')
  const [username, setUserName] = useState('default')

  const changeRoom = num => {
    setRoomNumber(num)
  }
  const changeName = str => {
    setUserName(str)
  }

  return (
    <GlobalContext.Provider
      value={{ roomNumber, changeRoom, username, changeName }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
