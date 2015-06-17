'use strict';

module.exports = function(app) {

  app.controller('BrewController', ['$scope', '$location', 'RESTResource', function($scope, $location, resource) {
    var Brew = resource('brew');
    $scope.errors = [];
    $scope.ingredients = [{item: 'Test Ingredient', amount: 5, unit: 'Cups'}, {item: 'Test Ingredient', amount: 5, unit: 'Oz'}, {item: 'Test Ingredient', amount: 5, unit: 'Lbs'}];
    $scope.steps = [{directions: 'Some Test Directions', offset: 60, status: true}, {directions: 'Some Test Directions', offset: 60, status: false}];
    $scope.title = '';

    $scope.getBrew = function(id) {
    };

    $scope.startTime = function() {
    };

    $scope.stopTime = function(){
    };



  }]);
};


