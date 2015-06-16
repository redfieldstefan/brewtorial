'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/brewtorial_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
var User = require('../models/User');

describe('Bru Buddy user routes', function(){
  var password = bcrypt.hashSync('foobaz123', bcrypt.genSaltSync(8), null);
  var testToken;
  var testUserId;

  before(function(done) {
    var testUser = new User({
      userId: uuid.v4(),
      displayName: 'test',
      basic: { email: 'test@example.com', password: password },
    });

    testUser.save(function(err, user) {
      if (err) console.log(err);

      testUserId = user._id;

      user.generateToken(process.env.APP_SECRET, function(err, token) {
        testToken = token;
        done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new user', function(done) {
    chai.request('localhost:3000')
      .post('/api/users/create_user')
      .send({displayName: 'test', email: 'test2@example.com', password: 'foobar123'})
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      })
  });

  it('should sign in an existing user', function(done) {
    chai.request('localhost:3000')
      .get('/api/users/sign_in')
      .auth('test@example.com', 'foobaz123')
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      })
  });

  it('should have access to a userId', function() {
    expect(testUserId).to.not.eql(null);
  });

  it('should update a users information', function(done) {
    chai.request('localhost:3000')
      .put('/api/users/update/' + testUserId)
      .send({displayName: 'changed'})
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('profile updated');
        done();
      })
  });

  it('should delete a user', function(done) {
    chai.request('localhost:3000')
      .del('/api/users/remove/' + testUserId)
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('profile removed');
        done();
      })
  });

});
