require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { SERVER_PORT } = process.env

//express uses http under the hood, but I need to access this variable directly for socket io.
const { createServer } = require('http')
const { Server } = require('socket.io')

app.use(cors())
app.use(express.json())

const server = createServer(app)
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
})
//run when a client connects
io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`)

	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`)
	})

	socket.on('join_room', (data) => {
		socket.join(data)
		console.log(`user with id: ${socket.id} joined room: ${data}`)
	})
	socket.on('leave_room', (data) => {
		socket.leave(data)
		console.log(`user with id: ${socket.id} left room: ${data}`)
	})
	socket.on('send_message', (data) => {
		console.log(data)
		socket.to(data.room).emit('receive_message', data)
		//this id is for room created -> to getALlRooms rerender on client
		if (data.id === 999999) {
			socket.broadcast.emit('receive_message', data)
		}
		if (data.id === 888888) {
			socket.broadcast.emit('receive_message', data)
		}
	})
})
//------endpoints-------
const {
	addUser,
	createRoom,
	getRooms,
	postMessage,
	getMessages,
	deleteRoom,
	updateRoomName,
} = require('./controller')
app.post('/api/users', addUser)
app.post('/api/rooms', createRoom)
app.get('/api/rooms', getRooms)
app.get('/api/messages/:roomNumber', getMessages)
app.post('/api/messages', postMessage)
app.delete('/api/rooms/:roomNumber', deleteRoom)
app.put('/api/rooms/:roomNumber', updateRoomName)

const PORT = SERVER_PORT || process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
