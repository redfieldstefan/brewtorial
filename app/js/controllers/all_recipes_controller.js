'use strict';

module.exports = function(app) {

  AllRecipesController.$inject = ['$scope', '$location', 'RESTResource', 'auth', '$cookies'];

  function AllRecipesController($scope, $location, resource, auth, $cookies) {
    $scope.page = 'recipe';    

    var Recipe = resource('recipe');
    $scope.errors = [];
    $scope.recipes = [];
    $scope.beerTally = 0;
    $scope.sortOrder = false;
    $scope.sortBy = 'name';

    $scope.getAll = function() {
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

    $scope.view = function(recipe) {
      $location.path('recipes/' + recipe._id);
    };
  }

  app.controller('AllRecipesController', AllRecipesController);
};
