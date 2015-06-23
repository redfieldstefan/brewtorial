"use strict";

var BrewEvent = require('../../models/BrewEvent.js');
var User = require('../../models/User');
var eatAuth = require("../../lib/eat_auth")(process.env.APP_SECRET);

module.exports = function(router) {

  router.post('/newbrew', eatAuth, function(req, res) {
    var newBrew = new BrewEvent(req.body);
    var thisUser = JSON.parse(JSON.stringify(req.body));
    newBrew.steps.status = true; //set status to true: in process
    User.findOne({'_id': req.user._id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      user.currentBrews.push({title: newBrew.title, id: newBrew._id});
      user.save(function(err, data) {
        if(err) { return console.log(err);}
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
  router.put('/:id', eatAuth, function(req, res) {
    BrewEvent.update({_id: req.params.id}, req.body, function(err, data) {
      if (err) { return console.log(err);}
      if(req.body.complete === true){
        User.findOne({'_id': req.user._id}, function(err, user) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'internal server error'});
          }
          var userBrews = user.currentBrews;
          for (var i = 0; i < userBrews.length; i++) {
            if(userBrews[i].id == req.params.id) {
              user.completedBrews.push(userBrews[i]);
              userBrews.splice(userBrews.indexOf(userBrews[i]),1);
            }
          };
          user.save(function(err, data) {
            if(err) { return console.log(err);}
            console.log('user saved');
          });
        });
      }
      res.status(200)
        .json({
          success: true,
          message: 'Brew event saved.',
          data: data
        });
    });
  });

};
