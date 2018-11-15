process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
var Users = require('../models/user')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/app')
var should = chai.should();

chai.use(chaiHttp)

describe('FacebookOAuthTest', function() {

  var JWT = ''

  describe('Get JWT and Facebook ID', () => {
    it('it should POST valid access token', (done) => {
      let token = {
        access_token: 'EAAaZCGZBdbSycBAP25ZA6ZBhIWYBlMWgPZBqscC5oG1iv2vUC8v41EqNHmpDe68pqUnyVWCzt6n5DHMAA8T90kB5Fv9Xs4H8EP5VIb7nXoge7fILUY0MEs8bggYxTtpXZCAJ7A6aHvQZChAQyFsMMdnSTaHDA6ZCd9Scx2t92NQsz0AVNFt3oaoOyDmDFZA2oI2vJQYh0cCqWiQSuw1SpQ5o48qlRdC8ZBaZC0reUPH0yZAH1thgLqxftMXZB'
      }

      chai.request(server)
        .post('/auth/facebook')
        .send(token)
        .end((err, res) => {
          if(err) {
            console.log(err)
          }

          res.body.should.have.property('auth').eql(true)
          res.body.should.have.property('token')
          res.body.should.have.property('facebookID')
          res.body.should.have.property('facebookID').eql('100594567627966')
          JWT = res.body.token
          done()
        })
    })

    it('it should POST an invalid token and recieve a 401 status', (done) => {
      let token = {
        access_token: 'ThisIsAnInvalidToken'
      }

      chai.request(server)
        .post('/auth/facebook')
        .send(token)
        .end((err, res) => {
          if(err) {
            console.log(err)
          }

          res.should.have.status(500)
          done()
        })
    })
  })

  describe('Decode JWT and get User info', () => {

    describe('Send valid JWT and recieve user profile', () => {

      it('Check if JWT is verified and decoded', (done) => {
        let id = {
          facebookID: '100594567627966'
        }

        chai.request(server)
          .get('/auth/validateUser')
          .query(id)
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lEIjoiMTAwNTk0NTY3NjI3OTY2IiwiaWF0IjoxNTQyMjczNTgyLCJleHAiOjE1NDI4NzgzODJ9.eAq9WViRw_jjljrpROgN_YIf_VU9XPi_MvNVqCgwkSk')
          .end((err, res) => {
            if(err) {
              console.log(err)
            }

            res.body.should.have.property('auth')
            res.body.should.have.property('user')
            res.body.user.should.have.property('name')
            res.body.user.should.have.property('name').eql('James Alcjcbbfhaegj Greenewitz')
            done()
         })
      })

      it('Send invalid id and recieve false auth', (done) => {
        let id = {
          facebookID: 'InvalidFacebookID'
        }

        chai.request(server)
          .get('/auth/validateUser')
          .query(id)
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYWNlYm9va0lEIjoiMTAwNTk0NTY3NjI3OTY2IiwiaWF0IjoxNTQyMjczNTgyLCJleHAiOjE1NDI4NzgzODJ9.eAq9WViRw_jjljrpROgN_YIf_VU9XPi_MvNVqCgwkSk')
          .end((err, res) => {
            if(err) {
              console.log(err)
            }

            res.body.should.have.property('auth')
            res.body.should.have.property('auth').eql(false)
            done()
         })
      })

      it('Send invalid JWT and recieve false auth', (done) => {
        let id = {
          facebookID: '100594567627966'
        }

        chai.request(server)
          .get('/auth/validateUser')
          .query(id)
          .set('x-auth-token', 'InvalidJWT')
          .end((err, res) => {
            if(err) {
              console.log(err)
            }

            res.body.should.have.property('auth')
            res.body.should.have.property('auth').eql(false)
            done()
         })
      })
    })
  })
})