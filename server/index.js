const express = require('express')
const cors = require('cors')
const app = express()

//express uses http under the hood, but I need to access this variable directly for socket io.
const { createServer } = require('http')
const { Server } = require('socket.io')

app.use(cors())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

//run when a client connects
io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })

  //listens to event called "send_message", the socket.broadcast.emit will then send data(message obj from front end) to all users connected to socket. Just wont send it back to the original sender
  socket.on('send_message', data => {
    console.log(data)
    socket.broadcast.emit('receive_message', data)
  })
})

const PORT = 3001 || process.env.PORT
server.listen(3001, () => console.log(`Server running on port ${PORT}`))
