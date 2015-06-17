'use strict';

module.exports = function(app) {

  LandingController.$inject = ['$scope', '$http'];

  function LandingController($scope, $http) {
    $scope.page = 'landing';
    $scope.tallies = {
      users: 0,
      recipes: 0,
      craftings: 0
    };
    
  };  

  app.controller('LandingController', LandingController);

};
