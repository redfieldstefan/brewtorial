'use strict';

module.exports = function(app) {
  app.controller('allRecipesController', ['$scope', function($scope, $http) {
    $scope.errors = [];
    $scope.recipes = [];
    $scope.ingredients = [];
    $scope.steps = [];

    $scope.getAll = function() {

    }

    $scope.addIngredient = function(ingredient) {
      $scope.ingredients.push({name: ingredient.name, quantity: ingredient.quantity});
      document.getElementById("ingredientForm").reset();
    };

    $scope.addStep = function(step) {
      $scope.steps.push({position: ($scope.steps.length + 1 ), instruction: step.instruction, time: step.time});
      document.getElementById("stepForm").reset();
      console.log($scope.steps)
    };

  }]);
};
