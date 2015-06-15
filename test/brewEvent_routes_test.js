'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/brubuddy_test';
require('../server.js');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('Bru Buddy brew event routes', function(){

  before(function(){
  });

  it('should create a new brew event');

  it('should return to a brew event and have its state persist');

  it('should change the status of a brew event step');

});
