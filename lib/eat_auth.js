var eat = require('eat');
var User = require('../models/User');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;

    if (!token) {
      console.log('unauthorized no token in request');
      return res.status(401).json({err: 'not authorized'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({err: 'not authorized'});
      }

      User.findOne({userId: decoded.id}, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(401).json({err: 'internal server error'});
        }

        if (!user) {
          console.log('no user found for that token');
          return res.status(401).json({err: 'not authorized'});
        }

        req.user = user;
        next();
      });
    });
  };
};
