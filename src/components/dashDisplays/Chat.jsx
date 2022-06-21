import React, { useState, useEffect } from 'react'
import { socket } from '../../webSocket'
import styles from './Chat.module.css'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({username, room}) => {
    
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    
    const sendMessage = async ()=>{
        
        if(currentMessage !== ''){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' +
                new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            
            setMessageList(prevMessageList => [...prevMessageList, messageData])
            setCurrentMessage('')
        }
    }
    useEffect(()=>{
        socket.on('receive_message', (data)=>{
        
            setMessageList(prevMessageList => [...prevMessageList, data])
            console.log(data.message)
        })
        
      }, [socket])

      let dispMessages = messageList.map((mess,index)=>{
            return <div key={index} id={username === mess.author? `${styles.you}` : `${styles.other}`}>
                <div className={styles.messageMeta}>
                    <span className={styles.meta}>{mess.author}</span>
                    <span className={styles.meta}>{mess.time}</span>
                </div>
                <div className={styles.message}>
               {mess.message}
                </div>
    
            </div>
  })

  return (
    <div className={styles.container}>
    
        <ScrollToBottom className={styles.chatBody}>
          {dispMessages}
        </ScrollToBottom>
        <div className={styles.chatFooter}>
            <input type="text" placeholder='send message...'
            onChange={e=>setCurrentMessage(e.target.value)}
            value={currentMessage}
            onKeyPress={e=>{e.key === 'Enter' && sendMessage()}}
            />
            <button onClick={sendMessage}>&#8593;</button>

        </div>
    </div>
  )
}

export default Chat