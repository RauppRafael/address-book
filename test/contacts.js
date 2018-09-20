// Require the dev-dependencies
const server = require('../app/app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const should = chai.should()
chai.use(chaiHttp)

// Our parent block
describe('Contacts', () => {

    const contact = {
        name: faker.name.findName(),
        emails: [
            faker.internet.email(),
            faker.internet.email(),
        ],
        phones: [
            faker.phone.phoneNumber(),
            faker.phone.phoneNumber(),
        ],
        addresses: [
            faker.address.streetAddress()
        ]
    }

    describe('/POST contacts', () => {
        it('It should not create contact for non-authenticated user', (done) => {
            chai.request(server)
                .post('/contacts')
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
    })
})
