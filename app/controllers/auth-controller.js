const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/User')

const controller = {
    login(req, res) {
        passport.authenticate('local', {session: false},
            (err, user, info) => {

                if (err || !user)
                    return res.status(400).json({errors: [info]})

                req.login(user, {session: false}, (err) => {
                    if (err)
                        throw err

                    user = user.toObject()
                    delete user.password

                    const token = jwt.sign(user, process.env.APP_SECRET, {expiresIn: '2h'})
                    return res.json({user: User.serialize(user), token})
                })

            }
        )(req, res)
    },

    register(req, res) {
        const user = new User({email: req.body.email, password: req.body.password})

        User.createUser(user, (err, createdUser) => {
            if (err) throw err
            res.status(201)
            res.json(User.serialize(createdUser))
        })
    }
}

module.exports = controller
