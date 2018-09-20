const passport = require('passport')
const passportJWT = require('passport-jwt')
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
                    return done(null, false, {
                        location: 'body',
                        param: 'email',
                        value: email,
                        msg: 'User not found'
                    })

                User.comparePassword(password, user.password, (err, isMatch) => {
                    if (err)
                        throw err

                    return isMatch ? done(null, user) : done(null, false, {
                        location: 'body',
                        param: 'password',
                        value: password,
                        msg: 'Incorrect password'
                    })
                })

            })
        }
    )
)

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.APP_SECRET
        },

        (jwtPayload, done) => {
            return User.findById(jwtPayload.id, (err, user) => {
                if (err)
                    throw err

                done(null, user)
            })
        }
    )
)

module.exports = passport
