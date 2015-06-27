var User = require('../../models/User');
var bodyparser = require('body-parser');
var uuid = require('uuid');
var eatAuth = require("../../lib/eat_auth")(process.env.APP_SECRET);

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    var newUser = new User();

    newUser.generateHash(req.body.password, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
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

    if (!('error' in req.user)) {
      req.user.generateToken(process.env.APP_SECRET, function(err, token) {
        if (err) {
          console.log(err);
          return res.status(500).json({ err: 'could not generate token' });
        } else {
          res.status(200)
            .json({
              success: true,
              message: 'Authentication passed',
              result: {
                token: token
              }
            });
          }
      });
    } else {
      res.status(200)
        .json({
          success: false,
          message: 'Authentication failed',
          result: req.user.message
        });
    }
  });

  router.put('/update', eatAuth, function(req, res) {
    var updates = req.body;
    delete updates._id;

    User.update({'_id': req.user.id}, updates, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({err: 'internal server error'});
      }

      res.status(200).json({msg: 'profile updated'});
    });
  });

  router.delete('/remove', eatAuth, function(req, res) {
    User.remove({'_id': req.user._id}, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).json({err: 'internal server error'});
      }

      res.status(200).json({msg: 'profile removed'});
    });
  });

  router.get('/get', function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: "internal server error"});
      }
      res.json(users);
    });
  });

  router.get('/get/profile', eatAuth, function(req, res) {
    User.findOne({'_id': req.user._id}, function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({err: 'internal server error'});
      }
      // user.findBrewEvents(function(){
      //   if(err){
      //     console.log(err);
      //     res.status(500).json({err: 'internal server error, could not find brew events'});
      //   }
      //   console.log('successfuly retrieved brew events');
      // });
      res.status(200).json({user: user});
    });
  });

};
