'use strict';

module.exports = function(app) {
  app.controller('createRecipeController', ['$scope', 'RESTResource', function($scope, resource, $http) {
    $scope.errors = [];
    $scope.ingredients = [];

    $scope.addIngredient = function(ingredient) {
      $scope.ingredients.push(ingredient)
    }

  }]);
};
