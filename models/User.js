var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  userId: String,
  displayName: { type: String, required: true },
  basic: {
    email: { type: String required: true, unique: true },
    password: { type: String, required: true }
  }
});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    if (err) callback(err);

    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) callback(err);

      callback(null, hash);
    });
  });
};

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, function(err, isSame) {
    if (err) callback(err);

    callback(null, isSame);
  });
};
