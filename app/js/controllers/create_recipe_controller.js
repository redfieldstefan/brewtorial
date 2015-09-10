'use strict';

module.exports = function(app) {

  app.controller('CreateRecipeController', ['$scope', '$location', 'RESTResource', '$cookies', 'auth', function($scope, $location, resource, $cookies, auth) {

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if(!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    var Recipe = resource('recipe');
    var Equipment = resource('equipment');
    $scope.page = 'recipe';
    $scope.errors = [];
    $scope.header = {};
    $scope.ingredients = [];
    $scope.steps = [];
    $scope.equipment = [];
    $scope.description = '';
    $scope.icons = ['../images/icons/brew-yellow.png', '../images/icons/brew-pale.png', '../images/icons/brew-amber.png', '../images/icons/brew-red.png', '../images/icons/brew-brown.png', '../images/icons/brew-dark.png'];
    $scope.icon = '';
    $scope.formStep = 'description';

    $scope.createRecipe = function() {
      var newRecipe = {
        header: $scope.header,
        equipment: $scope.equipment,
        ingredients: $scope.ingredients,
        steps: $scope.steps,
        description: $scope.description
      };
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

    $scope.nextStep = function(step) {
      $scope.formStep = step;
    };

    $scope.addDescription = function(description) {
      $scope.description = description;
    };

    $scope.addIcon = function(icon) {
      $scope.header.icon = icon;
    };

    $scope.addHeader = function(newHeader) {
      $scope.header = newHeader;
    };

    $scope.addIngredient = function(ingredient) {
      $scope.ingredients.push({item: ingredient.item, amount: ingredient.amount, unit: ingredient.unit});
      document.getElementById("form_ingredients").reset();
    };

     $scope.addStep = function(step) {
      if(!step.offset.days){
        step.offset.days = 0;
      }
      if(!step.offset.hours){
        step.offset.hours = 0;
      }
      if(!step.offset.minutes){
        step.offset.minutes = 0;
      }
      $scope.steps.push({directions: step.directions, offset: {days: step.offset.days, hours: step.offset.hours, minutes: step.offset.minutes}, status: false});
      step.offset.days = 0;
      step.offset.hours = 0;
      step.offset.minutes = 0;
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
