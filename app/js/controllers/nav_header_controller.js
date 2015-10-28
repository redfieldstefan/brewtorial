'use strict';

module.exports = function(app) {

  NavHeaderController.$inject = ['$scope', 'auth', '$location'];

  function NavHeaderController($scope, auth, $location) {
    $scope.page = $location.path();
    $scope.page = $scope.page.substr(1);
    $scope.loggedIn = false;

    $scope.turnOnSign = function() {
      var tl = new TimelineLite();
      tl.from('nav', 2, {boxShadow: '0 0 10px black'}, 'one')
      .from('nav p', 2, {opacity: 0}, 'two')
    };

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
