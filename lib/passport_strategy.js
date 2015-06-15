var Basic = require('basic-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    User.findOne({'basic.email': email}, function(err, user) {
      if (err) {
        console.log(err);
        return done('internal server error');
      };

      if (!user) return done('no such user');

      user.comparePassword(password, function(err, isSame) {
        if (err) {
          console.log(err);
          return done('internal server error');
        }

        if (!isSame) return done('wrong password');

        return done(null, user);
      });
    });
  }));
};
