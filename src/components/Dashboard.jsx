import React,{useContext, useEffect} from 'react'
import ContentDisplay from './dashDisplays/ContentDisplay'
import Header from './dashDisplays/Header'
import styles from './Dashboard.module.css'
import GlobalContext from '../GlobalContext'
import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios'


const Dashboard = () => {
  const {changeName, setId} = useContext(GlobalContext)
  const {user} = useAuth0()
 
  //once user logs in, this changes global state username to the nickname provided from auth0, also sends post request to automatically add user to database.
 useEffect(()=>{
  if(user){
    changeName(user.nickname)
    const userInfo = {
      email: user.email,
      full_name: user.nickname
    }
    //end point has conditional to check for user first before posting... always returning user id
    // axios.post('http://127.0.0.1:3001/api/users', userInfo).then((res)=>{
    axios.post('/api/users', userInfo).then((res)=>{
    // console.log(res.data.user_id)
    setId(res.data.user_id)
    }).catch(err=>[
      console.log(err)
    ])
  }
 },[user])
  
  return (
    <div className={styles.flexWrapper}>
        <Header/>
        <ContentDisplay/>
    </div>
  )
}

export default Dashboard