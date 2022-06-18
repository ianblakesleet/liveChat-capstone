import React,{useContext, useEffect} from 'react'
import ContentDisplay from './dashDisplays/ContentDisplay'
import Header from './dashDisplays/Header'
import styles from './Dashboard.module.css'
import GlobalContext from '../GlobalContext'
import {useAuth0} from '@auth0/auth0-react'








const Dashboard = () => {

  const {  userName, changeName} = useContext(GlobalContext)

  const {user} = useAuth0()
 
  //once user logs in, this changes global state username to the nickname provided from auth0
 useEffect(()=>{
  if(user){
    changeName(user.nickname)
  }
 },[])

  
  return (
    <div className={styles.flexWrapper}>
        <Header/>
        <ContentDisplay/>
    </div>
  )
}

export default Dashboard