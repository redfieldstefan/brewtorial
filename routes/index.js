// import modules.
var path = require('path');

// define route handlers.
var handlers = {
  api: require('./api')
};

// export router.
module.exports = function(router) {

  // mount route handlers.
  router.use('/api', handlers.api);

  // handle static resources.
  router.route(['/', '/:slug'])
    .get(function(req, res, next) {
      var filename = req.params.slug || 'index.html';
      var options = {
        root: path.join(__dirname, '../app/'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now()
        }
      };
      res.sendFile(filename, options, function(err) {
        if (err) { 
          console.log(err);
          res.status(err.status)
            .end();
        }        
      });
    });

}