// import modules.
var express = require('express');
var apiRouter = express.Router();

// export router.
module.exports = function(router) {
  
  // mount '/api' route handlers.
  router.route('/api')
    .all(require('./api-routes')(apiRouter));

  // sample route.
  router.route('/')
      .get(function(req, res, next) {
        res.status(200)
          .set('Content-Type', 'text/html')
          .end('<h1>Served!</h1>');
      });

}