import React from 'react'
import ContentDisplay from './dashDisplays/ContentDisplay'
import Header from './dashDisplays/Header'
import styles from './Dashboard.module.css'


const Dashboard = () => {
  return (
    <div className={styles.flexWrapper}>
      <Header/>
      <ContentDisplay/>
    </div>
  )
}

export default Dashboard