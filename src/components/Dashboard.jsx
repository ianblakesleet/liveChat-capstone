import React, { useContext } from 'react'
import ContentDisplay from './dashDisplays/ContentDisplay'
import Header from './dashDisplays/Header'
import styles from './Dashboard.module.css'
import {RoomProvider} from './RoomContext'


const Dashboard = () => {
  
  return (
    <div className={styles.flexWrapper}>
      <RoomProvider>
        <Header/>
        <ContentDisplay/>
      </RoomProvider>
    </div>
  )
}

export default Dashboard