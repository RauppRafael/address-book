require('dotenv').config()

// Imports
const express = require('express')
const path = require('path')
const expressValidator = require('express-validator')
const firebase = require('firebase')

// Routes
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const contactsRouter = require('./routes/contacts')

// Modules
const passport = require('./modules/passport')
require('./modules/db')

const app = express()

// Start firebase
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "raupp-address-book.firebaseapp.com",
    databaseURL: "https://raupp-address-book.firebaseio.com",
    projectId: "raupp-address-book",
    storageBucket: "raupp-address-book.appspot.com",
    messagingSenderId: "486812684592"
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/contacts', passport.authenticate('jwt', {session: false}, null), contactsRouter)

module.exports = app
