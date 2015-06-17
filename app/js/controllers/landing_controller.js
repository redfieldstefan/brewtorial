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

    function init() {

      // get tallies.
      $http.post('/api/service', {
        method: 'getTallies'
      })
      .success(function(data) {
        $scope.tallies = data.result;
      })
      .error(function(data, status) {
        console.error('error retrieving tallies.', status, data);
      });
    }

    init();
    
  };  

  app.controller('LandingController', LandingController);

};
