const mongoose = require('mongoose')

const URI = process.env.NODE_ENV.trim() === 'test' ? process.env.TEST_DB_URI : process.env.DB_URI

mongoose.connect(URI, { useNewUrlParser: true })
const db = mongoose.connection

module.exports = db
