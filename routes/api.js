// import modules.
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// mount routes.
router.use(bodyParser.json());

router.route('/brews/:id')
  .get(function(req, res, next) {
    next();
  })
  .put(function(req, res, next) {
    next();
  })
  .delete(function(req, res, next) {
    next();
  });

router.route('/brews')
  .get(function(req, res, next) {
    next();
  })
  .post(function(req, res, next) {
    next();
  });

// ===================================================================================================================

router.route('/brewers/:id')
  .get(function(req, res, next) {
    next();
  })
  .put(function(req, res, next) {
    next();
  })
  .delete(function(req, res, next) {
    next();
  });

router.route('/brewers')
  .get(function(req, res, next) {
    next();
  })
  .post(function(req, res, next) {
    next();
  });

// ===================================================================================================================

router.route('/drafts/:id')
  .get(function(req, res, next) {
    next();
  })
  .put(function(req, res, next) {
    next();
  })
  .delete(function(req, res, next) {
    next();
  });

router.route('/drafts')
  .get(function(req, res, next) {
    next();
  })
  .post(function(req, res, next) {
    next();
  });

// export router.
module.exports = router;