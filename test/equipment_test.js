process.env.MONGOLAB_URI = 'mongodb://localhost/brewtorial_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = require('chai').expect;
var Equipment = require('../models/Equipment');

describe('Brewtorial equipment api endpoint tests', function() {
  var testEquipment = new Equipment({
    name: 'jug',
    description: 'a test jug'
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should get an array of equipment', function(done) {
    chai.request('localhost:3000')
      .get('/api/equipment')
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body.success).to.eql(true);
        expect(Array.isArray(res.body.result)).to.eql(true);
        done();
      });
  });

  it('should post a new piece of equipment', function(done) {
    chai.request('localhost:3000')
      .post('/api/equipment')
      .send(testEquipment)
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body.success).to.eql(true);
        expect(res.body.result.name).to.eql('jug');
        expect(res.body.result.description).to.eql('a test jug');
        done();
      });
  });

  describe('it needs an existing piece of equipment', function() {
    var testEquipmentId;

    before(function(done) {
      var testEquipment = new Equipment({
        name: 'jug',
        description: 'a test jug'
      });

      testEquipment.save(function(err, data) {
        if (err) console.log(err);
        testEquipmentId = data._id;
        done();
      });
    });

    after(function(done) {
      mongoose.connection.db.dropDatabase(function() {
        done();
      });
    });

    it('should have access to test equipment id', function() {
      expect(testEquipmentId).to.not.eql(undefined);
    });

    it('should update a piece of equipment', function(done) {
      chai.request('localhost:3000')
        .put('/api/equipment/' + testEquipmentId)
        .send({name: 'big jug'})
        .end(function(err, res) {
          expect(res.status).to.eql(200);
          expect(err).to.eql(null);
          expect(res.body.success).to.eql(true);
          expect(res.body.message).to.eql('Update equipment successful.');
          done();
        });
    });

    it('should remove a piece of equipment', function(done) {
      chai.request('localhost:3000')
        .del('/api/equipment/' + testEquipmentId)
        .end(function(err, res) {
          expect(res.status).to.eql(200);
          expect(err).to.eql(null);
          expect(res.body.success).to.eql(true);
          expect(res.body.message).to.eql('Delete equipment successful.');
          done();
        });
    });
  });

});
