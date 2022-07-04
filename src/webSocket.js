import io from 'socket.io-client'
// const socket = io.connect('http://localhost:3001')
const socket = io.connect('https://chatroom-capstone.herokuapp.com/')

//this autoconnects, maybe move this to dashboard level in order to require authentication for login???

export { socket }
