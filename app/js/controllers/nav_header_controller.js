'use strict';

module.exports = function(app) {

  NavHeaderController.$inject = ['$scope', '$http', 'auth', '$location'];

  function NavHeaderController($scope, $http, auth, $location) {
    $scope.page = $location.path();
    $scope.page = $scope.page.substr(1);
    $scope.signOutUser = function() {
      auth.logout();
    };    
  };  

  app.controller('NavHeaderController', NavHeaderController);

};