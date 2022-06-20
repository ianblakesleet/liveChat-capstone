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
    INSERT INTO users (email, full_name)
    VALUES ('${email}', '${full_name}');
    `
      )
      .then(dbRes => {
        res.status(200).send(dbRes[0])
      })
      .catch(err => console.log(err))
  },
}
