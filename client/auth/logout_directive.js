"use strict";

module.exports = function(app) {
  app.directive('logoutDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      scope: {},
      template: "<div data-ng-show='signedIn()'><div  type='button'class='navbar' data-ng-click='signOut()'>Log Out</div></div>",
      controller: ['$scope', '$location', 'auth', function($scope, $location, auth) {
        $scope.signedIn = function() {
          return auth.isSignedIn();
        };
        $scope.signOut = function() {
          console.log('clicked');
          auth.logout();
          $location.path('/sign_in');
        };
      }]
    };
  });
};
