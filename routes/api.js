// import modules.
var express = require('express');
var recipeRouter = express.Router();

// import routes.
require('./api/recipe')(recipeRouter);

// export router.
module.exports = function(router) {

  router.use('/recipe', recipeRouter);

};
