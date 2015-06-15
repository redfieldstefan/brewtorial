'use strict';



module.exports = function(app) {
  app.controller('allRecipesController', ['$scope', function($scope, $http) {
    $scope.errors = [];
    $scope.recipes = [];
    $scope.ingredients = [];

    $scope.getAll = function() {

    }

    $scope.addIngredient = function(ingredient) {
      $scope.ingredients.push(ingredient)
      console.log(ingredient);
    }

  }]);
};
