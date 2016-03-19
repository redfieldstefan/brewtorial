// import modules.
var express = require('express');
var passport = require('passport');

var recipeRouter = express.Router();
var userRouter = express.Router();
var brewRouter = express.Router();
var serviceRouter = express.Router();
var equipmentRouter = express.Router();

// initialize passport
userRouter.use(passport.initialize());
require('../../common/passport_strategy')(passport);

// import routes.
require('./api/recipe')(recipeRouter);
require('./api/users')(userRouter, passport);
require('./api/brew_events')(brewRouter);
require('./api/service')(serviceRouter);
require('./api/equipment')(equipmentRouter);

// export router.
module.exports = function(router) {

  router.use('/recipe', recipeRouter);
  router.use('/users', userRouter);
  router.use('/brew', brewRouter);
  router.use('/service', serviceRouter);
  router.use('/equipment', equipmentRouter);

};
