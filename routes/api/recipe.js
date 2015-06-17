// import models.
var Recipe = require('../../models/Recipe');

// export router.
module.exports = function(router) {

  router.route('/:id')
    .get(function(req, res, next) {
      Recipe.findOne({ _id: req.params.id }, function(err, result) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Retrieve recipe successful.',
            result: result
          });
      });
    })
    .put(function(req, res, next) {
      var condition = { _id: req.params.id };
      var update = req.body;
      Recipe.update(condition, update, function(err, result) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Update recipe successful.',
            result: result
          });
      });
    })
    .delete(function(req, res, next) {
      Recipe.remove({ _id: req.params.id }, function(err, result) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Delete recipe successful.',
            result: result
          });
      });

    });

  router.route('/')
    .get(function(req, res, next) {
      Recipe.find({}, 'header', function(err, result) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Retrieve recipes successful.',
            result: result
          });
      });
    })
    .post(function(req, res, next) {
      var newRecipe = new Recipe(req.body);
      newRecipe.header.created = Date.now();
      newRecipe.save(function(err, result) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Recipe creation successful.',
            result: result
          });
      });
    });
};
