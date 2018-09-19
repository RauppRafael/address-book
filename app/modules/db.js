const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
const db = mongoose.connection

module.exports = db
