// import modules.
var express = require('express');
var recipeRouter = express.Router();

// import routes.
require('./api/recipe')(recipeRouter);

// export router.
module.exports = function(router) {

  router.use('/recipe', recipeRouter);

};
/*

// import modules.
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// import models.
var BrewEvent = require('../models/BrewEvent');
var Equipment = require('../models/Equipment');
var Recipe = require('../models/Recipe');

// global middleware.
router.use(bodyParser.json());

// brew events: retrieve, update, destroy.
router.route('/brew_event/:id')
  .get(function(req, res, next) {

  })
  .put(function(req, res, next) {

  })
  .delete(function(req, res, next) {

  });

// brew events: retrieveAll, create.
router.route('/brew_event')
  .get(function(req, res, next) {

  })
  .post(function(req, res, next) {

  });

// equipment: retrieve, update, destroy.
router.route('/equipment/:id')
  .get(function(req, res, next) {
    Equipment.findOne({_id: req.params('id')}, function(err, result) {
      if (err) { throw err; }
      res.status(200)
        .json({
          success: true,
          message: 'Equipment successfully returned.',
          result: result
        })
    });
  })
  .put(function(req, res, next) {
    var conditions = { _id: req.params.id };
    var update = req.body;
    Equipment.update(conditions, update, function(err, result) {
      if (err) { throw err; }
      res.status(200)
        .json({
          success: true,
          message: 'Equipment successfully updated.',
          result: result
        })
    });
  })
  .delete(function(req, res, next) {
    
  });

// equipment: retrieveAll, create.
router.route('/equipment')
  .get(function(req, res, next) {
    Equipment.find({}, function(err, results) {
      if (err) { throw err; }
      res.status(200)
        .json({
          success: true,
          message: 'Equipment lists successfully returned.',
          result: results
        })
    });
  })
  .post(function(req, res, next) {
    var newEquipment = new Equipment(req.body);
    newEquipment.save(function(err, result) {
      if (err) { throw err; }
      res.status(200)
        .json({
          success: true,
          message: 'Equipment created successfully.',
          result: result
        });
    });
  });

// recipe: retrieve, update, destroy.
router.route('/recipe/:id')
  .get(function(req, res, next) {

  })
  .put(function(req, res, next) {

  })
  .delete(function(req, res, next) {

  });

// recipe: retrieveAll, create.
router.route('/recipe')
  .get(function(req, res, next) {
    res.status(200)
      .json({success: true, message: 'der'});
  })
  .post(function(req, res, next) {});

// export router.
module.exports = router;
*/
