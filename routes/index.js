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

}
