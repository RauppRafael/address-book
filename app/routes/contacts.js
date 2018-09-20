const express = require('express')
const router = express.Router()
const _ = require('lodash')
const controller = require('../controllers/contact-controller')
const {check, validationResult} = require('express-validator/check')

const validation = [
    check('name', 'Name is required').exists(),
    check('name', 'Name must be a string').isString(),

    check('email', 'Email must be a valid email').isEmail().optional(),
]

/* Creates a contact. */
router.post('/', validation, (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()})

    controller.create(req, res, next)
})

module.exports = router
