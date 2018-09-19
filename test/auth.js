const mongoose = require("mongoose")
const User = require('../app/models/User')

// Require the dev-dependencies
const server = require('../app/app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const should = chai.should()
chai.use(chaiHttp)

// Our parent block
describe('Authentication', () => {

    const validUser = {
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    describe('/POST register', () => {
        it('It should create a new user', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send(validUser)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.haveOwnProperty('_id')
                    res.body.should.haveOwnProperty('email')
                    done()
                })
        })

        it('It should not create user with invalid email', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email: 'email',
                    password: faker.internet.password()
                })
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors').to.be.an('array').length(1)
                    done()
                })
        })

        it('It should not create user with invalid password', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email: faker.internet.email(),
                    password: '123'
                })
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors').to.be.an('array').length(1)
                    done()
                })
        })

        it('It should not create a user with invalid email and password', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send({
                    email: 'email',
                    password: '123'
                })
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors').to.be.an('array').length(2)
                    done()
                })
        })
    })

    describe('/POST login', () => {
        it('It should log a user in returning a token', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(validUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('token')
                    done()
                })
        })
    })

})
