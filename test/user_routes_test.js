'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/brubuddy_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('Bru Buddy user routes', function(){

  before(function(){
  });

  it('should create a new user');

  it('should sign in a new user');

  it('should update a users information');

  it('should delete a user');

});
