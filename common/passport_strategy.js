var Basic = require('passport-http').BasicStrategy;
var User = require('../server/models/User');

module.exports = function(passport) {

  passport.use('basic', new Basic({}, function(email, password, done) {

    User.findOne({'basic.email': email}, function(err, user) {

      // failure in processing.
      if (err) return done(err);

      // user not found.
      if (!user) {
        console.log('no such user, failed authentication.');
        return done(null, { error: 'no user' });
      }

      // check the password.
      user.checkPassword(password, function(err, isSame) {

        // failure in processing.
        if (err) return done(err);

        // password not valid.
        if (!isSame) {
          console.log('password not valid, failed authentication.');
          return done(null, { error: 'wrong password' });
        }

        // credentials valid.
        console.log('authentication passed');
        return done(null, user);
      });
    });
  }));
};
