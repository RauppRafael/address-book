const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')
const {check, validationResult} = require('express-validator/check')

const validation = [
    check('name', 'Name is required').exists(),
    check('name', 'Name must be a string').isString(),
]

// TODO finish validation

/* Creates a contact. */
router.post('/', (req, res, next) => {
    try {
        const contact = new Contact({
            data: req.body,
            userId: req.user.id
        })
        res.status(201)
        res.json(contact)
    } catch (e) {
        console.log()
        res.json({
            errors: [
                e.message
            ]
        })
    }

})

module.exports = router
