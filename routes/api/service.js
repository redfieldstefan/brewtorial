// import models.
var User = require('../../models/User');

// export router.
module.exports = function(router) {

  router.route('/')
    .all(function(req, res, next) {
      switch(req.body.method) {

        // get the tallies displayed on the landing page.
        case 'getLandingTallies':
          res.status(200)
            .json({
              success: true,
              message: 'Tallies successfully queried.',
              result: {
                users: 10,
                recipes: 20,
                craftings: 100  
              }              
            });
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
