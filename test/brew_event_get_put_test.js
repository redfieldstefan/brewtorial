'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/brewtorial_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var Recipe = require('../models/Recipe');
var User = require('../models/User');
var BrewEvent = require('../models/BrewEvent');
var uuid = require('uuid');
var bcrypt = require('bcrypt-nodejs');

describe('Brewtorial brew event get/put routes', function(){
  var password = bcrypt.hashSync('foobaz123', bcrypt.genSaltSync(8), null);
  var testUserId;
  var testBrew;
  var testBrewId;
  var testToken;

  beforeEach(function(done){
    var testUser = new User({
      userId: uuid.v4(),
      displayName: 'test',
      basic: { email: 'testbrew@example.com', password: password }
    });

    testUser.save(function(err, user) {
      if (err) {
        return console.log(err);
      }
      testUserId = user._id;
      user.generateToken(process.env.APP_SECRET, function(err, token) {
        if (err) console.log(err);
        testToken = token;
        testBrew = new BrewEvent({
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
        });

        testBrew.save(function(err, brew) {
          if (err) console.log(err);
          testBrewId = brew._id;
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should return to a brew event and have its state persist', function(done) {
    chai.request('localhost:3000')
      .get('/api/brew/' + testBrewId)
      .send({eat: testToken})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(typeof res.body.data).to.eql('object');
        expect(res.body.message).to.eql('Successfully retrieved brew event');
        done();
      });
  });

  it('should change the status of a brew event step', function(done) {
    chai.request('localhost:3000')
      .put('/api/brew/' + testBrewId)
      .send({ steps: [{ status: false }], eat: testToken})
      .end(function(err, res) {
        console.log(res.body);
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(typeof res.body.data).to.eql('object');
        expect(res.body.message).to.eql('Brew event saved.');
        done();
      });
  });
});
