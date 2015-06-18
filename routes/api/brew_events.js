"use strict";

var BrewEvent = require('../../models/BrewEvent.js');
var eatAuth = require("../../lib/eat_auth")(process.env.APP_SECRET);

module.exports = function(router) {

  router.post('/newbrew', function(req, res) {
    var newBrew = new BrewEvent(req.body);
    newBrew.steps.status = true; //set status to true: in process
    newBrew.save(function(err, data) {
      if(err) { return console.log(err);}
      res.status(200)
        .json({
          success: true,
          message: 'Recipe creation successful.',
          data: data
        });
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

  //brew is ready
  router.put('/:id', function(req, res) {
    BrewEvent.update({_id: req.params.id}, req.body, function(err, data) {
      if (err) { return console.log(err);}
      res.status(200)
        .json({
          success: true,
          message: 'Successfully updated brew',
          data: data
        });
    });
  });

};
