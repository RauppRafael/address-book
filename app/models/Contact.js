const firebase = require('firebase')

class Contact {
    constructor({data, userId}) {
        const userRef = firebase.database()
            .ref('contacts/' + userId)

        this.id = userRef.push().key
        this.name = data.name
        this.email = data.email
        this.phone = data.phone
        this.address = data.address

        userRef.child(this.id).set(this.map(data))
    }

    map(data) {
        const contact = {
            name: data.name
        }
        if ('email' in data && data.email) contact.email = data.email
        if ('phone' in data && data.phone) contact.phone = data.phone
        if ('address' in data && data.address) contact.address = data.address

        return contact
    }
}

module.exports = Contact
