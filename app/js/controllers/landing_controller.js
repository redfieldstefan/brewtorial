'use strict';

module.exports = function(app) {

  LandingController.$inject = ['$scope'];

  function LandingController($scope) {
    $scope.page = 'landing';
    $scope.tallies = {
      users: 0,
      recipes: 0,
      craftings: 0
    };

  };  

  app.controller('LandingController', LandingController);

};
