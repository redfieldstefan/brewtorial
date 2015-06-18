// import models.
var User = require('../../models/User');
var Recipe = require('../../models/Recipe');
var Events = require('../../models/BrewEvent');

// export router.
module.exports = function(router) {

  router.route('/')
    .all(function(req, res, next) {
      switch(req.body.method) {

        // get the tallies displayed on the landing page.
        case 'getLandingTallies':
          var results = {
            users: 0,
            recipes: 0,
            craftings: 0
          };
          var asyncCompleted = 0;

          // get users tally.
          User.count({}, function(err, count) {
            if (err) {
              console.log('error getting users tally', err);
              res.status(500)
                .json({ msg: 'internal server error' });
            }
            results.users = count;
            sendResultCheck();
          });

          // get recipes tally.
          Recipe.count({}, function(err, count) {
            if (err) {
              console.log('error getting recipes tally', err);
              res.status(500)
                .json({ msg: 'internal server error' });
            }
            results.recipes = count;
            sendResultCheck();
          });

          // get craftings (events) tally.
          Events.count({}, function(err, count) {
            if (err) {
              console.log('error getting craftings tally', err);
              res.status(500)
                .json({ msg: 'internal server error' });
            }
            results.craftings = count;
            sendResultCheck();
          })

          function sendResultCheck() {
            asyncCompleted++;
            if (asyncCompleted === 3) {
              res.status(200)
                .json({
                  success: true,
                  message: 'Tallies successfully queried.',
                  result: results   
                });
            }
          }
                    
          break;

        // ensures email address provided is unique.
        case 'isEmailUnique':
          User.find({ 'basic.email': req.body.data.email }, function(err, results) {
            if (err) { 
              console.log('error ensuring email is unique', err);
              res.status(500)
                .json({ msg: 'internal server error' })
            }
            res.status(200)
              .json({
                success: true,
                message: 'Unique email validation was successful.',
                result: (results.length) ? false: true
              });
          });
          break;
          
        default:
          res.status(500)
            .json({
              success: false,
              message: 'No such service method',
              result: null
            });
      }
    });

};
