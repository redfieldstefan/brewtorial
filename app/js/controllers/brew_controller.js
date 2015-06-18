'use strict';

module.exports = function(app) {

  app.controller('BrewController', ['$scope', '$location', '$routeParams', 'RESTResource', function($scope, $location, $routeParams, resource) {
    var Brew = resource('brew');
    $scope.errors = [];
    $scope.ingredients = [];
    $scope.steps = [];
    $scope.title = '';
    $scope.description = '';

    $scope.getBrew = function() {
      Brew.getOne($routeParams, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error fetching the brew event'});
        }
        console.log(data);
        $scope.steps.push(data.steps);
        $scope.ingredients.push(data.ingredients);
        $scope.title = data.title;
      });
    };

    $scope.startBrew = function(){
      $scope.steps[0].status = true;
    };

    $scope.startStep = function(step) {
      step.status = true;
      Brew.save($routeParams, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'could not move to next step'});
        }
        console.log('save successful')
      });
    }

    $scope.startTime = function(time) {
    };

    $scope.stopTime = function(time){
    };

    $scope.resetTime = function(time){
    };



  }]);
};


