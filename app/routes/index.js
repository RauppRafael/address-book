const express = require('express')
const router = express.Router()

/* GET API routes. */
router.get('/', (req, res) => {
    res.json({
        routes: {
            auth: {
                login: {
                    GET: 'Get login form',
                    POST: 'Returns your access token'
                },
                register: {
                    GET: 'Get registration form',
                    POST: 'Creates a new account'
                }
            },
        }
    })
})

module.exports = router
