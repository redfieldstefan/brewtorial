// import modules.
var express = require('express');
var passport = require('passport');

var recipeRouter = express.Router();
var userRouter = express.Router();

// initialize passport
userRouter.use(passport.initialize());
require('../lib/passport_strategy')(passport);

// import routes.
require('./api/recipe')(recipeRouter);
require('./api/users')(userRouter, passport);

// export router.
module.exports = function(router) {

  router.use('/recipe', recipeRouter);
  router.use('/users', userRouter);

};
