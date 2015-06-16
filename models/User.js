var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  displayName: { type: String, required: true },
  basic: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }

});

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
