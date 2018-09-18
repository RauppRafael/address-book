require('dotenv').config()

// Imports
const express = require('express')
const path = require('path')
const expressValidator = require('express-validator')

// Routes
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const contactsRouter = require('./routes/contacts')

// Modules
const passport = require('./modules/passport')
require('./modules/db')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/users', passport.authenticate('jwt', {session: false}, null), usersRouter)
app.use('/contacts', contactsRouter)

module.exports = app
