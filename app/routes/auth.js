const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth-controller')
const User = require('../models/User')
const {check, validationResult} = require('express-validator/check')

const validEmail = check('email', 'Email is invalid').isEmail()
const validPassword = check('password', 'Password must contain at least 6 characters').isLength({min: 6})
const uniqueEmail = check('email').custom(
    async (email) => {
        const user = await User.findByEmail(email)
        if (user)
            throw new Error('Email already in use.')
    }
)

// TODO expire token

/* POST login. */
router.post('/login', validEmail, validPassword, (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()})

    controller.login(req, res, next)
})

/* POST Register. */
router.post('/register', validEmail, validPassword, uniqueEmail, (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()})

    controller.register(req, res, next)
})

module.exports = router
