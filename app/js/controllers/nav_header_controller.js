'use strict';

module.exports = function(app) {

  NavHeaderController.$inject = ['$scope', 'auth', '$location'];

  function NavHeaderController($scope, auth, $location) {
    $scope.page = $location.path();
    $scope.page = $scope.page.substr(1);
    $scope.loggedIn = false

    $scope.signOutUser = function() {
      auth.logout();
    };

    $scope.isLoggedIn = function() {
      $scope.loggedIn = auth.isSignedIn();
      return auth.isSignedIn();
    };
  }

  app.controller('NavHeaderController', NavHeaderController);

};
