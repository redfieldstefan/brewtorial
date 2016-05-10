'use strict';

module.exports = function(app) {

  app.controller('CreateRecipeController', ['$scope', '$location', 'RESTResource', '$routeParams', '$cookies', 'auth', function($scope, $location, RESTResource, $routeParams, $cookies, auth) {

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if(!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    var Recipe = RESTResource('recipe');
    var Equipment = RESTResource('equipment');
    $scope.steps = [{name: 'Basics', complete: false},{name:'Details', complete: false}, {name:'Ingredients', complete: false}, {name:'Equipment', complete: false}, {name:'Directions', complete: false}, {name:'Review', complete: false}];
    $scope.page = 'recipe';
    $scope.errors = [];
    $scope.icons = ['../images/icons/brew-yellow.png', '../images/icons/brew-pale.png', '../images/icons/brew-amber.png', '../images/icons/brew-red.png', '../images/icons/brew-brown.png', '../images/icons/brew-dark.png'];

    $scope.ingredientsAutocomplete = ["Hops", "Grains", "Yeast", "Malt"];
    $scope.unitsAutocomplete = ["Cups", "Tbsp", "Tsp", "Gallons", "Ounces"];

    $scope.getRecipe = function () {
      if($routeParams.id) {
        Recipe.getOne($routeParams.id, function(err, recipe) {
          if (err) {
            console.log(err);
            return $scope.errors.push({msg: 'Problem finding resource'});
          }
          $scope.recipe = recipe.result;
          $scope.formStep = $scope.steps[$scope.recipe.stepIndex].name;
        });
      } else {
        $scope.recipe  = {header: {}, steps: [], equipment: [{}], ingredients: [{}], stepIndex: 0};
        $scope.formStep = $scope.steps[$scope.recipe.stepIndex].name;
      }
    };

    $scope.setup = function () {
      $scope.getRecipe();
      $scope.getEquipmentList();
      var ingredients = ["Hops", "Grains", "Yeast", "Malt"];
      $("#ingredients-input" ).autocomplete({
        source: ingredients,
        select: function(event, ui) {
          event.preventDefault();
          $("#ingredients-input").val(ui.item.value);
        }
      });
    };

    $scope.saveRecipe = function () {
      if($scope.recipe.stepIndex === 0 && !$routeParams.id) {
        return $scope.createRecipe();
      } else {
        Recipe.save($scope.recipe._id, $scope.recipe, function (err, data) {
          if(err) {
            return console.log(err);
          }
          console.log('Save succesful');
        });
      }
    }

    $scope.createRecipe = function() {
      Recipe.create($scope.recipe, function(err, data) {
        if(err) {
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error creating the recipe'});
        } else {
          console.log(data);
          $scope.recipe = data.result;
        }
      });
    };

    $scope.addEmptyIngredient = function () {
      $scope.recipe.ingredients.push({});
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
      $scope.saveRecipe();
      console.log($scope.recipe.stepIndex);
      if(number > -1) {
        $scope.steps[$scope.recipe.stepIndex].complete = true;
      }
      $scope.recipe.stepIndex += number;
      $scope.formStep = $scope.steps[$scope.recipe.stepIndex].name;
    };

    $scope.jumpStep = function(step) {
      $scope.recipe.stepIndex = $scope.steps.indexOf(step);
      $scope.formStep = $scope.steps[$scope.recipe.stepIndex].name;
    };

    $scope.addIcon = function(icon) {
      $scope.recipe.header.icon = icon;
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

    $scope.addEmptyEquipment = function() {
      $scope.recipe.equipment.push({});
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
