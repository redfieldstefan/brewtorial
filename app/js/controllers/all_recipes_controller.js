'use strict';

module.exports = function(app) {
  app.controller('allRecipesController', ['$scope', 'RESTResource' function($scope, resource) {
    var Brew = resouce('brews');
    $scope.errors = [];
    $scope.recipes = [];
    $scope.header = [];
    $scope.ingredients = [];
    $scope.steps = [];
    $scope.equipment = [];

    $scope.getAll = function() {
      Brew.getAll(function(err, data) {
        if(err) {
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error retrieving the recipes'});
        }
        $scope.recipes = data;
      })
    }

    $scope.addIngredient = function(ingredient) {
      $scope.ingredients.push({item: ingredient.item, amount: ingredient.amount, unit: ingredient.unit});
      console.log($scope.ingredients);
      document.getElementById("ingredientForm").reset();
    };

    $scope.addStep = function(step) {
      $scope.steps.push({position: ($scope.steps.length + 1 ), instruction: step.instruction, time: step.time});
      document.getElementById("stepForm").reset();
      console.log($scope.steps)
    };

    $scope.addHeader = function(header) {
      $scope.header.push(header);
      document.getElementById("headerForm").reset();
      console.log($scope.header)
    };

    $scope.addEquipment = function(item) {
      $scope.equipment.push(item);
      document.getElementById("equipmentForm").reset();
      console.log($scope.equipment)
    };

  }]);
};
