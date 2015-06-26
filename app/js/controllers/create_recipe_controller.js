'use strict';

module.exports = function(app) {

  app.controller('CreateRecipeController', ['$scope', '$location', 'RESTResource', '$cookies', 'auth', function($scope, $location, resource, $cookies, auth) {

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if(!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    $scope.page = 'recipe';
    var Recipe = resource('recipe');
    var Equipment = resource('equipment');
    $scope.errors = [];
    $scope.availableEquipment = [];
    $scope.header = {};
    $scope.ingredients = [];
    $scope.steps = [];
    $scope.equipment = [];
    $scope.description = '';

    $scope.createRecipe = function() {
      var newRecipe = {
        header: $scope.header,
        equipment: $scope.equipment,
        ingredients: $scope.ingredients,
        steps: $scope.steps,
        description: $scope.description
      };
      console.log(newRecipe);
      Recipe.create(newRecipe, function(err, data) {
        if(err) {
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error creating the recipe'});
        } else {
          clearForms();
          var address = data.result._id;
          $location.path('/recipes/' + address);
        }
      });
    };

    $scope.getEquipmentList = function() {
      Equipment.getAll(function(err, data) {
        if (err) {
          console.log(err);
          $scope.errors.push({msg: 'unable to retrieve recipes'});
        }
        $scope.availableEquipment = data.result;
      });
    };

    $scope.addDescription = function(description) {
      $scope.description = description;
      document.getElementById("description").value = '';
    };

    $scope.addHeader = function(newHeader) {
      $scope.header = newHeader;
      document.getElementById("form_headers").reset();
    };

    $scope.addIngredient = function(ingredient) {
      $scope.ingredients.push({item: ingredient.item, amount: ingredient.amount, unit: ingredient.unit});
      document.getElementById("form_ingredients").reset();
    };

    $scope.addStep = function(step) {
      $scope.steps.push({position: ($scope.steps.length + 1 ), directions: step.directions, offset: {days: step.offset.days, hours: step.offset.hours, minutes: step.offset.minutes}, status: false});
      document.getElementById("form_steps").reset();
    };

    $scope.addEquipment = function(item) {
      $scope.equipment.push(item);
      document.getElementById("form_equipment").reset();
    };

    var clearForms = function () {
      $scope.recipes = [];
      $scope.header = {};
      $scope.ingredients = [];
      $scope.steps = [];
      $scope.equipment = [];
      $scope.description = '';
    };

  }]);
};
