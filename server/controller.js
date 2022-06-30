require('dotenv').config()
const Sequelize = require('sequelize')
const { DATABASE_URL } = process.env
const sequelize = new Sequelize(DATABASE_URL, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
})

module.exports = {
	addUser: (req, res) => {
		const { email, full_name } = req.body
		sequelize
			.query(
				`
        SELECT * FROM users
        WHERE email = '${email}';
    `
			)
			.then((dbRes) => {
				//checks if user exists (response length more than 0)
				//returning data on user (so i can grab user_id for other things)
				if (dbRes[0].length !== 0) {
					res.status(200).send(dbRes[0][0])
					console.log(dbRes[0])
				}
				//if its there isnt a user, make another query to add user to table
				else {
					sequelize
						.query(
							`
          INSERT INTO users (email, full_name)
          VALUES ('${email}', '${full_name}')
          RETURNING * ;
          `
						)
						.then((dbRes2) => {
							res.status(200).send(dbRes2[0][0])
							console.log(dbRes2[0])
						})
				}
			})
			.catch((err) => console.log(err))
	},
	createRoom: (req, res) => {
		const { room, id } = req.body
		sequelize
			.query(
				`
        SELECT * FROM rooms
        WHERE room_name = '${room}';
    `
			)
			.then((dbRes) => {
				if (dbRes[0].length !== 0) {
					res.status(200).send('already exists')
					console.log(dbRes[0])
				} else {
					sequelize
						.query(
							`
          INSERT INTO rooms (room_name, room_author_id)
          VALUES ('${room}', ${id});
          `
						)
						.then((dbRes) => {
							res.status(200).send(dbRes[0][0])
							console.log(dbRes[0])
						})
				}
			})
			.catch((err) => console.log(err))
	},
	getRooms: (req, res) => {
		sequelize
			.query(
				`
    SELECT * FROM rooms;
    `
			)
			.then((dbRes) => {
				res.status(200).send(dbRes[0])
			})
			.catch((err) => {
				console.log(err)
			})
	},
	postMessage: (req, res) => {
		const { message, room, userID, message_time } = req.body
		sequelize
			.query(
				`
		INSERT INTO messages (message, message_time, message_room_id, message_author_id)
		VALUES ('${message}', '${message_time}', ${room}, ${userID});
		`
			)
			.then((dbRes) => {
				res.status(200).send(dbRes[0])
				console.log(dbRes[0])
			})
	},
	getMessages: (req, res) => {
		const { roomNumber } = req.params
		console.log(roomNumber)
		sequelize
			.query(
				`
				SELECT m.message, m.message_time, u.full_name
				FROM messages as m
				JOIN users as u
				ON m.message_room_id = ${roomNumber} AND m.message_author_id = u.user_id;
		`
			)
			.then((dbRes) => {
				res.status(200).send(dbRes[0])
				console.log(dbRes[0])
			})
	},
	deleteRoom: (req, res) => {
		const { roomNumber } = req.params
		sequelize.query(`
		DELETE FROM rooms WHERE room_id = ${roomNumber}
		`)
	},
}
