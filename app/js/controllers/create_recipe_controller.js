'use strict';

module.exports = function(app) {

  app.controller('CreateRecipeController', ['$scope', '$location', 'RESTResource', function($scope, $location, resource) {
    $scope.page = 'recipe';

    var Recipe = resource('recipe');
    $scope.errors = [];
    $scope.header = {};
    $scope.ingredients = [];
    $scope.steps = [];
    $scope.equipment = [];
    $scope.description = ''

    $scope.createRecipe = function() {
      var newRecipe = {
        header: $scope.header,
        equipment: $scope.equipment,
        ingredients: $scope.ingredients,
        steps: $scope.steps
      };
      Recipe.create(newRecipe, function(err, data) {
        if(err) {
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error creating the recipe'});
        } else {
          console.log(data);
          clearForms();
          console.log(data);
          var address = data.result._id;
          $location.path('/recipes/' + address);
        }
      });
    };

    $scope.addDescription = function(description) {
      $scope.description = description;
    }

    $scope.addHeader = function(newHeader) {
      $scope.header = newHeader;
      document.getElementById("headerForm").reset();
    };

    $scope.addIngredient = function(ingredient) {
      $scope.ingredients.push({item: ingredient.item, amount: ingredient.amount, unit: ingredient.unit});
      document.getElementById("ingredientForm").reset();
    };

    $scope.addStep = function(step) {
      $scope.steps.push({position: ($scope.steps.length + 1 ), directions: step.directions, offset: step.offset, status: false});
      document.getElementById("stepForm").reset();
    };

    $scope.addEquipment = function(item) {
      $scope.equipment.push(item);
      document.getElementById("equipmentForm").reset();
    };

    var clearForms = function () {
      $scope.recipes = [];
      $scope.header = {};
      $scope.ingredients = [];
      $scope.steps = [];
      $scope.equipment = [];
    }

  }]);
};

