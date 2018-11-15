//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose')
const User = require("../models/user")

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });



  //Test case #1: /user/create
  describe('/Post user', () => {
      it('Test case #1: it should create a user', (done) => {

        let user = {
          name: "leslie"
      }

        chai.request(app)
            .post('/user/create')
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
          done();
        });
            
      });
  });

 //Test case #2: /user/create
  describe('/Post user', () => {
    it('Test case #2: it should create a user', (done) => {

      let user = {
        name: "andrew"
      }

      chai.request(app)
          .post('/user/create')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        done();
      });
          
    });
});

//Test Case #3: Testing /user/get_user given an id in the query string
describe('/GET user', () => {
  it('Test case #3: it should GET a user by the given id', (done) => {

      let tmp_user = new User(
        { name: "leslie", priceLow: 2, priceHigh:5, restrictions:["peanuts", "seafood"]}
        );

      tmp_user.save((err, tmp_user) => {
          chai.request(app)
        .get('/user/' +'get_user?user_id=' + tmp_user.id) //i see, it's bc got get_users, it's posts: post
        .send(tmp_user)
        .end((err, res) => {
          // console.log(res);
             //console.log(err);
             console.log(res.body);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('user');
              res.body.should.have.property('status');
              res.body.user.should.have.property('priceLow');
              res.body.user.should.have.property('priceHigh');
              res.body.user.should.have.property('_id');
              res.body.user.should.have.property('name');
              res.body.user.should.have.property('transactions');
          done();
        });
      });
      });

  });




});