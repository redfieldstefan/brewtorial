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
  var testPassword = bcrypt.hashSync('foobaz', bcrypt.genSaltSync(8), null);
  var testToken;

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new user', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/users/create_user')
      .send({displayName: 'test', email: 'test2@example.com', password: 'foobar123'})
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      })
  });

  it('should update a users information');

  it('should delete a user');

});
