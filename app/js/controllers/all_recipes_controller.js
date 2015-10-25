'use strict';

module.exports = function(app) {

  AllRecipesController.$inject = ['$scope', '$location', 'RESTResource', 'auth', '$cookies'];

  function AllRecipesController($scope, $location, resource, auth, $cookies) {
    $scope.page = 'recipe';

    var Recipe = resource('recipe');
    var Service = resource('service');
    $scope.errors = [];
    $scope.recipes = [];
    $scope.beerTally = 0;
    $scope.sortOrder = false;
    $scope.sortBy = 'name';
    $scope.tallies = {
      users: 0,
      recipes: 0,
      craftings: 0
    };

    $scope.getLandingTallies = function() {
      Service.create({method: 'getLandingTallies'}, function(err, data) {
        if (err) console.log(err);
        $scope.tallies = data.result;
      });
    };

    $scope.getAll = function() {
      $scope.getLandingTallies();
      Recipe.getAll(function(err, data) {
        if (err) {
          console.log(err);
          $scope.errors.push({msg: 'unable to retrieve recipes'});
        }
        $scope.beerTally = data.result.length;
        $scope.recipes = data.result;
      });
    };

    $scope.sort = function(propName) {
      $scope.sortBy = 'header.' + propName;
      $scope.sortOrder = !$scope.sortOrder;
    };

    // $scope.view = function(recipe) {
    //   window.location = '#/recipes/' + recipe._id;
    // };

  }

  app.controller('AllRecipesController', AllRecipesController);
};
