module.exports = function(router) {
  
  // sample route.
  router.route('/')
      .get(function(req, res, next) {
        res.status(200)
          .set('Content-Type', 'text/html')
          .end('<h1>Served!</h1>');
      });

}