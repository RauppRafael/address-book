const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.send(req.user)
})

router.patch('/', (req, res, next) => {
    // TODO update user
})

router.delete('/', (req, res, next) => {
    // TODO delete user
})

module.exports = router
