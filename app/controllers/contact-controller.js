const Contact = require('../models/Contact')

const controller = {
    create(req, res) {
        try {
            const contact = new Contact({
                data: req.body,
                userId: req.user.id
            })
            res.status(201)
            res.json(contact)
        } catch (e) {
            res.json({
                errors: [
                    e.message
                ]
            })
        }
    }
}

module.exports = controller
