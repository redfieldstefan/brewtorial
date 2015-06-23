'use strict';

module.exports = function(app) {

  NavHeaderController.$inject = ['$scope', 'auth', '$location'];

  function NavHeaderController($scope, auth, $location) {
    $scope.page = $location.path();
    $scope.page = $scope.page.substr(1);
    $scope.signOutUser = function() {
      auth.logout();
    };
    $scope.isLoggedIn = function() {
      return auth.isSignedIn();
    };
  }

  app.controller('NavHeaderController', NavHeaderController);

};
