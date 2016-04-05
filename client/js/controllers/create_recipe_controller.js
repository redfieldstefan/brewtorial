'use strict';

module.exports = function(app) {

  app.controller('CreateRecipeController', ['$scope', '$location', 'RESTResource', '$cookies', 'auth', function($scope, $location, RESTResource, $cookies, auth) {

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if(!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    var Recipe = RESTResource('recipe');
    var Equipment = RESTResource('equipment');
    $scope.steps = [{name: 'Description', complete: false},{name:'Information', complete: false}, {name:'Ingredients', complete: false}, {name:'Icons', complete: false}, {name:'Equipment', complete: false}, {name:'Instructions', complete: false}, {name:'Review', complete: false}];
    $scope.stepIndex = 0;
    $scope.formStep = $scope.steps[$scope.stepIndex].name;
    $scope.page = 'recipe';
    $scope.errors = [];
    $scope.recipe  = {header: {}, steps: [], equipment: [], ingredients: []}
    $scope.icons = ['../images/icons/brew-yellow.png', '../images/icons/brew-pale.png', '../images/icons/brew-amber.png', '../images/icons/brew-red.png', '../images/icons/brew-brown.png', '../images/icons/brew-dark.png'];

    $scope.createRecipe = function() {
      Recipe.create($scope.recipe, function(err, data) {
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

    $scope.changeStep = function(number) {
      if(number > -1) {
        $scope.steps[$scope.stepIndex].complete = true;
      }
      $scope.stepIndex += number;
      $scope.formStep = $scope.steps[$scope.stepIndex].name;
    };

    $scope.jumpStep = function(step) {
      $scope.stepIndex = $scope.steps.indexOf(step);
      $scope.formStep = $scope.steps[$scope.stepIndex].name;
    };

    $scope.addIcon = function(icon) {
      $scope.recipe.header.icon = icon;
    };

    $scope.addIngredient = function(ingredient) {
      $scope.recipe.ingredients.push({item: ingredient.item, amount: ingredient.amount, unit: ingredient.unit});
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

    $scope.remove = function(thing, arr) {
      var index = arr.indexOf(thing);
      arr.splice(index, 1);
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
