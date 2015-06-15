'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/brubuddy_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('Bru Buddy recipe routes', function(){

  before(function(){
  });

  it('Should create a recipe');

  it('Should return a list of recipes');

  it('Should return information for a specific recipe');

  it('Should update a specific recipe');

  it('Should delete a specific recipe');

});
