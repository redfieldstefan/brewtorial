'use strict';

module.exports = function(app) {

  DashboardController.$inject = ['$scope', 'RESTResource'];

  function DashboardController($scope, resource) {
    $scope.page = 'dashboard';
    var Recipe = resource('recipe');
    $scope.errors = [];
    $scope.recipes = [];
    $scope.beerTally = 0;
    $scope.sortOrder = false;
    $scope.sortBy = 'name';

    $scope.getAll = function() {
      Recipe.getAll(function(err, data) {
        if (err) {
          console.log(err);
          $scope.push({msg: 'unable to retrieve recipes'});
        }

        $scope.beerTally = data.result.length;
        $scope.recipes = data.result;
      });
    };

    $scope.sort = function(propName) {
      $scope.sortBy = 'header.' + propName;
      $scope.sortOrder = !$scope.sortOrder;
    };

    $scope.view = function(recipe) {
      console.log(recipe._id);
    }
  };

  app.controller('DashboardController', DashboardController);
};
