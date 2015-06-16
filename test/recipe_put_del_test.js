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
var uuid = require('uuid');
var bcrypt = require('bcrypt-nodejs');

describe('Brewtorial recipe put/del by id routes', function() {
  var password = bcrypt.hashSync('foobaz123', bcrypt.genSaltSync(8), null);
  var testRecipeId;

  var testUser = new User({
    userId: uuid.v4(),
    displayName: 'test',
    basic: { email: 'testBrewer@example.com', password: password }
  });

  beforeEach(function(done){
    testUser.save(function(err, user) {
      if (err) console.log(err);

      var testUserId = user._id;
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
        done();
      });
    });
  });

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to reference a recipe id', function() {
    expect(testRecipeId).to.not.eql(null);
  });

  it('should be able to get a recipe by its id', function(done) {
    chai.request('localhost:3000')
      .get('/api/recipe/' + testRecipeId)
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body.success).to.eql(true);
        expect(res.body.result.header.title).to.eql('American Amber');
        done();
      });
  });

  it('should be able to update a recipe by its id', function(done) {
    chai.request('localhost:3000')
      .put('/api/recipe/' + testRecipeId)
      .send({'header.abv': 7})
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body.success).to.eql(true);
        done();
      });
  });

  it('should be able to remove a recipe by its id', function(done) {
    chai.request('localhost:3000')
      .del('/api/recipe/' + testRecipeId)
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body.success).to.eql(true);
        done();
      });
  });
});
