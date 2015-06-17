
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
