// import models.
var Equipment = require('../../models/Equipment');

// export router.
module.exports = function(router) {

  router.route('/:id')
    .get(function(req, res, next) {
      Equipment.findOne({ _id: req.params.id }, function(err, results) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Retrieve equipment successful.',
            result: results
          });
      });
    })
    .put(function(req, res, next) {
      var condition = { _id: req.params.id };
      var update = req.body;
      Equipment.update(condition, update, function(err, result) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Update equipment successful.',
            result: result
          });
      });
    })
    .delete(function(req, res, next) {
      Equipment.remove({ _id: req.params.id }, function(err, result) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Delete equipment successful.',
            result: result
          });
      });

    });

  router.route('/')
    .get(function(req, res, next) {
      Equipment.find({}, function(err, results) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Retrieve equipments successful.',
            result: result
          });
      });
    })
    .post(function(req, res, next) {
      var newEquipment = new Equipment(req.body);
      newEquipment.save(function(err, result) {
        if (err) { throw err; }
        res.status(200)
          .json({
            success: true,
            message: 'Equipment creation successful.',
            result: result
          });
      });
    });

};
