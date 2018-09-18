process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")
let User = require('../app/models/User')

// Require the dev-dependencies
let server = require('../app/app')
let chai = require('chai')
let chaiHttp = require('chai-http')
const faker = require('faker')
let should = chai.should()
chai.use(chaiHttp)

// Our parent block
describe('User', () => {

    const user = {
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    /*
      * Test the /GET route
      */
    describe('/GET user', () => {
        it('It should receive a unauthorized status', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
    })

    describe('/POST register', () => {
        it('It should create a new user', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.haveOwnProperty('_id')
                    res.body.should.haveOwnProperty('email')
                    res.body.should.haveOwnProperty('password')
                    done()
                })
        })
    })

    describe('/POST login', () => {
        it('It should log a user in returning a token', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.haveOwnProperty('token')
                    done()
                })
        })
    })

})
