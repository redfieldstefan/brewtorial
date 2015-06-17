"use strict";

var BrewEvent = require('../../models/BrewEvent.js');

module.exports = function(router) {

  router.post('/newbrew', function(req, res) {
    var newBrew = new BrewEvent(req.body);
    newBrew.save(function(err, data) {
      if(err) { throw err; }
      res.status(200)
        .json({
          success: true,
          message: 'Recipe creation successful.',
          data: data
        })
    });
  });

  router.get('/:id', function(req, res) {
    BrewEvent.findOne({_id: req.params.id}, function(err, data) {
      if(err) { return console.log(err);}
      res.status(200)
        .json({
          success: true,
          message: 'Successfully retrieved brew event',
          data: data
        });
    });
  });

}
