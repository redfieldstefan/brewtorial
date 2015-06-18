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
var BrewEvent = require('../models/BrewEvent.js');
var uuid = require('uuid');
var bcrypt = require('bcrypt-nodejs');
var testUserId;
var testRecipeId;
var testBrewId;

describe('Bru Buddy brew event routes', function(){

var password = bcrypt.hashSync('foobaz123', bcrypt.genSaltSync(8), null);
  var testRecipeId;

  var testUser = new User({
    userId: uuid.v4(),
    displayName: 'test',
    basic: { email: 'testbreww@example.com', password: password }
  });

  beforeEach(function(done){
    testUser.save(function(err, user) {
      if (err) console.log(err);

      testUserId = user._id;
      var testRecipe = new Recipe({
        header: {
          abv: 5,
          author: testUserId,
          brewTime: 20,
          created: Date.now(),
          difficulty: 2,
          icon: 'www.test.com/img',
          likes: 10,
          popularity: [testUserId],
          style: 'Amber',
          title: 'American Amber'
        },
        equipment: ['big brew pot', 'thermometer'],
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
        ]
      });
      testRecipe.save(function(err, recipe) {
        if (err) console.log(err);

        testRecipeId = recipe._id;
        var testBrew = new BrewEvent({
          userId: testUserId,
          recipe: testRecipeId
        });
        testBrew.save(function(err, brew) {
          if (err) console.log(err);
          testBrewId = brew._id;
        });
        done();
      });
    });
  });

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create a new brew event', function(done) {
    chai.request('localhost:3000')
      .post('/api/brew/newbrew')
      .send({
        userId: testUserId,
        recipe: testRecipeId
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Recipe creation successful.');
        expect(res.body.data._id).to.exist; //jshint ignore: line
        expect(typeof res.body.data).to.eql('object');
        done();
      });
  });

  it('should return to a brew event and have its state persist', function(done) {
    chai.request('localhost:3000')
      .get('/api/brew/' + testBrewId)
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
      .send({ steps: [{ status: false }]})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(typeof res.body.data).to.eql('object');
        expect(res.body.message).to.eql('Successfully updated brew');
        done();
      });
  });

});
