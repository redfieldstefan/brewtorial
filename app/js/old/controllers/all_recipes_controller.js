'use strict';

module.exports = function(app) {

  app.controller('allRecipesController', ['$scope', '$location', 'RESTResource', function($scope, $location, resource) {
    var Recipe = resource('recipe');
    $scope.errors = [];
    $scope.recipes = [];
    $scope.header = {};
    $scope.ingredients = [];
    $scope.steps = [];
    $scope.equipment = [];

    $scope.getAll = function() {
      Recipe.getAll(function(err, data) {
        if(err) {
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error retrieving the recipes'});
        }
        $scope.recipes = data;
      });
    };

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
<<<<<<< HEAD:app/js/controllers/all_recipes_controller.js
          clearForms();
=======
          var address = data.result._id;
          console.log(address);
          $location.path('/recipe/' + address);
          $scope.errors = [];
          $scope.recipes = [];
          $scope.header = {};
          $scope.ingredients = [];
          $scope.steps = [];
          $scope.equipment = [];
>>>>>>> 8782815b8f35bd6ab26c08056b9f58c06ef92007:app/js/old/controllers/all_recipes_controller.js
        }
      });
    };

    $scope.addHeader = function(newHeader) {
      $scope.header = newHeader;
      document.getElementById("headerForm").reset();
    };

    $scope.addIngredient = function(ingredient) {
      $scope.ingredients.push({item: ingredient.item, amount: ingredient.amount, unit: ingredient.unit});
      document.getElementById("ingredientForm").reset();
    };

    $scope.addStep = function(step) {
      $scope.steps.push({position: ($scope.steps.length + 1 ), directions: step.directions, offset: step.offset, complete: false});
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
