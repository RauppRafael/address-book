const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator/check')

const appSecret = process.env.APP_SECRET
const validation = [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({min: 6})
]

/* POST login. */
router.post('/login', validation, (req, res, next) => {
    passport.authenticate('local', {session: false},
        (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({
                    message: 'Authentication failed',
                    info
                })
            }

            req.login(user, {session: false}, (err) => {
                if (err)
                    throw err

                const token = jwt.sign(user.toObject(), appSecret)
                return res.json({user, token})
            })
        }
    )(req, res)
})

/* POST Register. */
router.post('/register', validation, (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const user = new User({email: req.body.email, password: req.body.password})

    User.createUser(user, (err, newUser) => {
        if (err) throw err
        res.json(newUser)
    })
})

module.exports = router


