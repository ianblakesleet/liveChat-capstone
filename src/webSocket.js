import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

//this autoconnects, maybe move this to dashboard level in order to require authentication for login???

export { socket }
