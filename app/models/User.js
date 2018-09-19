const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = module.exports = mongoose.model('User', Schema)

module.exports.createUser = (data, callback) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(data.password, salt, function (err, hash) {
            data.password = hash
            data.save(callback)
        })
    })
}

module.exports.findByEmail = (email, callback) => {
    const query = {email}
    User.findOne(query, callback)
}

module.exports.findById = (id, callback) => {
    const query = {id}
    User.findOne(query, callback)
}

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err)
            throw err

        callback(null, isMatch)
    })
}

module.exports.serialize = (user) => {
    return {
        _id: user._id,
        email: user.email
    }
}
