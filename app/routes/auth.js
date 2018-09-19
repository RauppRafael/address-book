const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth-controller')
const {check, validationResult} = require('express-validator/check')

const validation = [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password must contain at least 6 characters').isLength({min: 6})
]

/* POST login. */
router.post('/login', validation, (req, res, next) => {
    controller.login(req, res, next)
})

/* POST Register. */
router.post('/register', validation, (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()})

    controller.register(req, res, next)
})

module.exports = router


