var mongoose = require('mongoose');
var BrewEvent = require('./BrewEvent');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  displayName: { type: String, required: true, unique: true },
  basic: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  currentBrews: [],
  completedBrews: []
});

userSchema.methods.findBrewEvents = function(callback) {
  var user = this;
  BrewEvent.find({userId: user}, function(err, brewEvents){
    if(err){
      callback(err);
    }
    console.log(brewEvents);
    user.currentBrews = brewEvents;
    user.save(function(err){
      if(err) {
        console.log(err);
      }
    });
  });
};

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) {
        callback(err);
      }

      callback(null, hash);
    });
  });
};

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, function(err, res) {
    if (err) {
      callback(err);
    }

    callback(null, res);
  });
};

userSchema.methods.generateToken = function(secret, callback) {
  eat.encode({id: this.userId, timeStamp: Date.now()}, secret, callback);
};

module.exports = mongoose.model('User', userSchema);
