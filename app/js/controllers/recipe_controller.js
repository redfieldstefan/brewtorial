'use strict';

module.exports = function(app) {

  RecipeController.$inject = ['$scope', '$http'];

  function RecipeController($scope, $http) {
    $scope.page = 'recipe';

    function init() {
      
    }

    init();
    
  };  

  app.controller('RecipeController', RecipeController);

};
