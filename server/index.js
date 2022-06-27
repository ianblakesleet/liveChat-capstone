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
	socket.on('send_message', (data) => {
		console.log(data)
		socket.to(data.room).emit('receive_message', data)
	})
})
//------endpoints-------
const { addUser, createRoom, getRooms, postMessage } = require('./controller')
app.post('/api/users', addUser)
app.post('/api/rooms', createRoom)
app.get('/api/rooms', getRooms)
app.post('/api/messages', postMessage)

const PORT = SERVER_PORT || process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
