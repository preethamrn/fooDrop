//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose')
const User = require("../models/user")
const Post = require("../models/post")

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');

let should = chai.should();
var assert = require('assert');
var expect = require('chai').expect;



chai.use(chaiHttp);

var post = {
  name: "Udayan Sahai",
  description: "wow",
  imageUrl: "",
  dietaryRestrictions: ["peanuts"],
  ingredients: ["eggs"],
  location: {lat:27, lon:78},
  price: 10,
  sellerId: "oiuoy87gukjkj",
  quantity: 2
}


// Our parent block
describe('Posts', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Post.remove({}, (err) => {       
    //     });       
    //     done(); 
    // });



  //Test case #1: /dish/new_dish
  describe('/POST create', () => {
      it('Test case #1: it should create a new dish', (done) => {

        chai.request(app)
            .post('/dish/new_dish')
            .send(post)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
          done();
        });
            
      });
  });


 //Test case #2: get the dishes from the database. 
  describe('/GET get_dishes', () => {
    it('Test case #2: it should get dishes', (done) => {

    const test_string = `priceLow=1&priceHigh=100&radius=100000&dietaryRestrictions[0]=peanuts`

      chai.request(app)
          .get('/dish/get_dishes?' + test_string)
          .end((err, res) => {
            console.log(res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('dishes');
            res.body.should.have.property('success');
            res.body.dishes.should.be.a('array');
            res.body.dishes[0].should.have.property("location");
            res.body.dishes[0].should.have.property("ingredients");

        done();
      });
          
    });
});

  describe('/GET get_dishes', () => {
    it('Test case #2: it should get 0 dishes', (done) => {

    const test_string = `priceLow=1&priceHigh=100&radius=100000&dietaryRestrictions[0]=peanut`

      chai.request(app)
          .get('/dish/get_dishes?' + test_string)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('dishes');
            res.body.should.have.property('success');
            res.body.dishes.should.be.a('array');
            expect(res.body.dishes).to.have.lengthOf(0);
        done();
      });
    });
});

}); 