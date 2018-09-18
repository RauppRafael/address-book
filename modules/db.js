const mongoose = require('mongoose')

mongoose.connect(process.env.DB_NAME, { useNewUrlParser: true })
const db = mongoose.connection

module.exports = db;
