const express = require('express')
const router = express.Router()

/* Redirect to github repo */
router.get('/', (req, res) => {
    res.send('Address book API - for documentation visit <a href="https://github.com/RauppRafael/address-book">the github repository</a>')
})

module.exports = router
