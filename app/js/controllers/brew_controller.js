'use strict';

module.exports = function(app) {

  app.controller('BrewController', ['$scope', '$location', '$routeParams', 'RESTResource', function($scope, $location, $routeParams, resource) {
    var Brew = resource('brew');
    $scope.thisBrew;
    $scope.errors = [];
    $scope.ingredients;
    $scope.steps;
    $scope.title;
    $scope.description;

    $scope.getBrew = function() {
      Brew.getOne($routeParams, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error fetching the brew event'});
        }
        $scope.thisBrew = data.data;
        console.log($scope.thisBrew)
        $scope.steps = data.data.steps;
        $scope.ingredients = data.data.ingredients;
        $scope.title = data.data.title;
        $scope.description = data.data.description;
      });
    };

    $scope.startBrew = function(){
      $scope.steps[0].status = true;
      console.log('started')
    };

    $scope.startStep = function(step) {
      step.status = true;
      console.log($scope.thisBrew);
      Brew.save($scope.thisBrew, function(err, data) {
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


