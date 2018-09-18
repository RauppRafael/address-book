const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const appSecret = process.env.APP_SECRET

// router
//     .route('/')
//
//     /**
//      * GETS user data
//      */
//     .get((req, res, next) => {
//         res.send('this is a get 1' + process.env.APP_SECRET);
//     })
//
//     /**
//      * Creates a new user
//      */
//     .post((req, res, next) => {
//         res.send('this is a post 1');
//     })
//
//     /**
//      * Updates user data
//      */
//     .put((req, res, next) => {
//         res.send('this is a put 1');
//     })
//
//     /**
//      * Deletes user account
//      */
//     .delete((req, res, next) => {
//         res.send('this is a delete 1');
//     })

module.exports = router
