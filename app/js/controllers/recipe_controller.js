'use strict';

module.exports = function(app) {

  app.controller('RecipeController', ['$scope', '$location', 'RESTResource', function($scope, $location, resource) {
    var BrewEvent = resource('brewEvent');
    var Recipe = resource('recipe');
    $scope.errors = [];
    $scope.recipes = [];

    $scope.getAll = function() {
      Recipe.getAll(function(err, data) {
        if(err) {
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error retrieving the recipes'});
        }
        $scope.recipes = data;
      });
    };

    $scope.createBrewEvent = function() {
      var newBrewEvent = {
        parentRecipe: $routeParams.id,
        ingredients: $scope.ingredients,
        steps: $scope.steps
      }
      BrewEvent.create(newBrewEvent, function(err, data){
        if(err) {
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error creating the recipe'});
        } else {
          console.log(data);
          var address = data.result._id;
          $location.path('/recipe/' + address);
        }
      });
    };
  }]);
};

