'use strict';

module.exports = function(app) {

  IngredientController.$inject = ['$scope', '$http'];

  function IngredientController($scope, $http) {
    $scope.page = 'ingredient';

    function init() {

    }

    init();

  }

  app.controller('IngredientController', IngredientController);

};
