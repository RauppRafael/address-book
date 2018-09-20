// Require the dev-dependencies
const server = require('../app/app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const should = chai.should()
const User = require('../app/models/User')
chai.use(chaiHttp)

describe('Contacts', async () => {

    before((done) => {
        User.deleteMany({}, (err) => {
            done()
        })
    })

    const user = {
        email: 'example@example.com',
        password: 'example123'
    }

    await chai.request(server)
        .post('/auth/register')
        .send(user)

    const login = await chai.request(server)
        .post('/auth/login')
        .send(user)

    const token = login.body.token

    describe('/POST contacts', () => {
        it('It should create contact', (done) => {
            const contact = {
                name: faker.name.findName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                address: faker.address.streetAddress(),
            }

            chai.request(server)
                .post('/contacts')
                .set('Authorization', 'Bearer ' + token)
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('email')
                    res.body.should.have.property('phone')
                    res.body.should.have.property('address')
                    done()
                })
        })

        it('It should not create contact for non-authenticated user', (done) => {
            const contact = {
                name: faker.name.findName(),
            }
            chai.request(server)
                .post('/contacts')
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })

        it('It should not create contact without a name', (done) => {
            chai.request(server)
                .post('/contacts')
                .set('Authorization', 'Bearer ' + token)
                .send({})
                .end((err, res) => {
                    res.should.have.status(422)
                    done()
                })
        })

        it('It should not create contact with an invalid email', (done) => {
            const contact = {
                name: faker.name.findName(),
                email: 'thisisnotanemail.com'
            }
            chai.request(server)
                .post('/contacts')
                .set('Authorization', 'Bearer ' + token)
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(422)
                    done()
                })
        })

        it('It should ignore all fields that are not listed', (done) => {
            const contact = {
                name: faker.name.findName(),
                nope: 'abc',
                nah: 'abc',
                noWay: 'I will be erased',
            }
            chai.request(server)
                .post('/contacts')
                .set('Authorization', 'Bearer ' + token)
                .send(contact)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.not.have.property('nope')
                    res.body.should.not.have.property('nah')
                    res.body.should.not.have.property('noWay')
                    done()
                })
        })
    })
})
