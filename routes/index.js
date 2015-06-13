// get the api route handlers.
var handlers = {
  api: require('./api')
};

// export router.
module.exports = function(router) {

  // mount route handlers.
  router.use('/api', handlers.api);

  // sample route.
  router.route('/')
    .get(function(req, res, next) {
      res.status(200)
        .set('Content-Type', 'text/html')
        .end('<h1>Served!</h1>');
    });

}