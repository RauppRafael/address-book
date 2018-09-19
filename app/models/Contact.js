const firebase = require('firebase')

class Contact {
    constructor({data, userId}) {
        const userRef = firebase.database()
            .ref('contacts/' + userId)

        this.id = userRef.push().key
        this.name = data.name
        this.emails = data.emails
        this.phones = data.phones
        this.addresses = data.addresses

        userRef.child(this.id).set(data)
    }

    map(data) {
        const contact = {
            name: data.name
        }
        if ('emails' in data && data.emails) contact.emails = data.emails
        if ('phones' in data && data.phones) contact.phones = data.phones
        if ('addresses' in data && data.addresses) contact.addresses = data.addresses

        return contact
    }
}

module.exports = Contact
