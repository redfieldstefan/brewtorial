'use strict';

module.exports = function(app) {

  app.controller('BrewController', ['$scope', '$location', '$routeParams', 'RESTResource', function($scope, $location, $routeParams, resource) {
    var Brew = resource('brew');
    $scope.errors = [];
    $scope.ingredients = [{item: 'Test Ingredient', amount: 5, unit: 'Cups'}, {item: 'Test Ingredient', amount: 5, unit: 'Oz'}, {item: 'Test Ingredient', amount: 5, unit: 'Lbs'}];
    $scope.steps = [{directions: 'Some Test Directions', offset: 60, status: true}, {directions: 'Some Test Directions', offset: 60, status: false}, {directions: 'Some Test Directions', offset: 60, status: false}];
    $scope.title = '';

    $scope.getBrew = function() {
      Brew.getOne($routeParams, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error creating the recipe'});
        }
        console.log(data);
        $scope.steps.push(data.steps);
        $scope.ingredients.push(data.ingredients);
        $scope.title = data.title;
      });
    };

    $scope.startStep = function(step) {
      step.status = true;
      Brew.save($routeParams, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error creating the recipe'});
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


