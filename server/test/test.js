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
      it('it should create a user', (done) => {

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
    it('it should create a user', (done) => {

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

describe('/GET user', () => {
  it('it should GET a user by the given id', (done) => {

      let tmp_user = new User(
        { name: "leslie", priceLow: 2, priceHigh:5, restrictions:["peanuts", "seafood"]}
        );

      tmp_user.save((err, tmp_user) => {
          chai.request(app)
        .get('/user/' +'get_users?user_id=' + tmp_user.id)
        .send(tmp_user)
        .end((err, res) => {
          // console.log(res);
             //console.log(err);
             console.log(res.body.posts);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('posts');
              res.body.posts[0].should.have.property('_id');
              res.body.posts[0].should.have.property('name');
              res.body.posts[0].should.have.property('priceLow');
              res.body.posts[0].should.have.property('priceHigh');
              //weird how we need to do res.body.post to get our desired values instead of res.body
          done();
        });
      });
      });

  });

});