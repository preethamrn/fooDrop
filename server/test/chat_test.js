//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose')
const Chat = require("../models/chat")

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');
let should = chai.should();

chai.use(chaiHttp);

//before each test, we empty the database
describe('Chat', () => {
    beforeEach((done) => { //Before each test we empty the database
        Chat.remove({}, (err) => { 
           done();           
        });        
    });
    //Tests go in here
    describe('/Get chats', ()=>{

        it('Test case #1: it should GET chats by chatId', (done) => {

            let tmp_chat = new Chat(
              { chatId: "12", buyer: "leslie", seller: "andrew", messages: [{userId:"9", username:"rumman", message: "GET OVER HERE"}]}
              );
      
            tmp_chat.save((err, tmp_chat) => {
                chai.request(app)
              .get('/chat/' +'get_chats?chatId=' + tmp_chat.chatId) //i see, it's bc got get_users, it's posts: post
              .send(tmp_chat)
              .end((err, res) => {
                // console.log(res);
                   //console.log(err);
                   console.log(res.body);
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('success');
                   res.body.should.have.property('result');
                   res.body.result.should.have.property('chatId');
                   res.body.result.chatId.should.equal('12');
                   res.body.result.should.have.property('buyer');
                   res.body.result.buyer.should.equal('leslie');
                   res.body.result.should.have.property('seller');
                   res.body.result.seller.should.equal('andrew');
                   res.body.result.should.have.property('messages');
                   res.body.result.messages.should.be.a('array');
                done();
              });
            });
            });
    });

});