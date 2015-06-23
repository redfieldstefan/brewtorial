'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/brewtorial_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var User = require('../models/User');
var BrewEvent = require('../models/BrewEvent');
var uuid = require('uuid');
var bcrypt = require('bcrypt-nodejs');

describe('Bru Buddy brew event post route', function(){
  var password = bcrypt.hashSync('foobaz123', bcrypt.genSaltSync(8), null);
  var testUserId;
  var testBrew;
  var testBrewId;
  var testToken;

  before(function(done) {
    var testUser = new User({
      userId: uuid.v4(),
      displayName: 'test',
      basic: { email: 'testbrewer@example.com', password: password }
    });

    testUser.save(function(err, user) {
      if (err) console.log(err);

      testUserId = user._id;
      user.generateToken(process.env.APP_SECRET, function(err, token) {
        if (err) console.log(err);

        testToken = token;
        testBrew = {
          eat: testToken,
          userId: testUserId,
          ingredients: [
            {item: 'malt extract', amount: '3.3', unit: 'pounds'},
            {item: 'hops', amount: '.5', unit: 'ounces'}
          ],
          steps: [
            {
              directions: 'Fill brew pot with 3 gallons of fresh water.',
              offset: 0,
              complete: false
            },
            {
              directions: 'Add steeping grains',
              offset: 15,
              complete: false
            }
          ],
          complete: false
        };
        done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new brew event', function(done) {
    chai.request('localhost:3000')
      .post('/api/brew/newbrew')
      .send(testBrew)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Brew event saved.');
        expect(res.body.data._id).to.exist; //jshint ignore: line
        expect(typeof res.body.data).to.eql('object');
        done();
      });
  });
});
