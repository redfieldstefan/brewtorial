'use strict';

module.exports = function(app) {
  app.controller('allRecipesController', ['$scope', function($scope, $http) {
    $scope.errors = [];
    $scope.recipes = [];

    $scope.getAll = function() {

    }

  }]);
};
