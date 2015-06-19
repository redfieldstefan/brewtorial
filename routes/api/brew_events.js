"use strict";

var BrewEvent = require('../../models/BrewEvent.js');
var User = require('../../models/User');
var eatAuth = require("../../lib/eat_auth")(process.env.APP_SECRET);

module.exports = function(router) {

  router.post('/newbrew', eatAuth, function(req, res) {
    var newBrew = new BrewEvent(req.body);
    var thisUser = JSON.parse(JSON.stringify(req.body));
    console.log(thisUser.userId);
    newBrew.steps.status = true; //set status to true: in process
    User.findOne({'_id': req.user._id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      user.currentBrews.push(newBrew.title);
      user.save(function(err, data) {
        if(err) { return console.log(err);}
        console.log("user saved");
        console.log(newBrew.title);
      });
      newBrew.save(function(err, data) {
        if(err) { return console.log(err);}
        res.status(200)
          .json({
            success: true,
            message: 'Brew event saved.',
            data: data
          });
        console.log("new brew created");
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
