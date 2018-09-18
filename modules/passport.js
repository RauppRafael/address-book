const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },

        (email, password, done) => {
            User.findByEmail(email, (err, user) => {
                if (err)
                    throw err

                if (!user)
                    return done(null, false, {message: 'User not found'})

                User.comparePassword(password, user.password, (err, isMatch) => {
                    if (err)
                        throw err

                    return isMatch ? done(null, user) : done(null, false, {message: 'Incorrect password'})
                })

            })
        }
    )
)

module.exports = passport
