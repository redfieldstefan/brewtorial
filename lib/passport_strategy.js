var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    console.log('email and password sent in:', email, password);
    User.findOne({'basic.email': email}, function(err, user) {
      if (err) return done(err);
      console.log('user after find:', user);
      if (!user) return done('no such user');

      user.checkPassword(password, function(err, isSame) {
        console.log('hit!');
        if (err) return done(err);

        if (!isSame) return done('wrong password');

        return done(null, user);
      });
    });
  }));
};
