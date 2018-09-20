const express = require('express')
const router = express.Router()

/* Redirect to github repo */
router.get('/', (req, res) => {
    res.redirect('https://github.com/RauppRafael/address-book')
})

module.exports = router
