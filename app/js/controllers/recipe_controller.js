'use strict';

module.exports = function(app) {

  app.controller('RecipesController', ['$scope', 'RESTResource', function($scope, resource) {
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
      })
    };
  }]);

};
