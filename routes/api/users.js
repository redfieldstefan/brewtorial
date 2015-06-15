var User = require('../../models/User');
var bodyparser = require('body-parser');
var uuid = require('uuid');

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    var newUser = new User();

    newUser.generateHash(req.body.password, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({err: 'internal server error'});
      }

      // generate unique uuid for each new user
      newUser.userId = uuid.v4();
      newUser.displayName = req.body.displayName;
      newUser.basic.email = req.body.email;
      newUser.basic.password = hash;

      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({err: 'could not create user'});
        }

        user.generateToken(process.env.APP_SECRET, function(err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({err: 'could not generate token'});
          }

          res.status(200).json({token: token});
        });
      });
    });
  });

  router.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({err: 'could not generate token'});
      }

      res.status(200).json({token: token});
    });
  });
};
