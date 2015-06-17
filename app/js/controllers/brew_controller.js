'use strict';

module.exports = function(app) {

  BrewController.$inject = ['$scope', '$http'];

  function BrewController($scope, $http) {
    $scope.page = 'brew';

    function init() {
      
    }

    init();
    
  };  

  app.controller('BrewController', BrewController);

}
