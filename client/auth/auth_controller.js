"use strict";

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
      if(auth.isSignedIn()) {
        $location.path('/logged_in');
      }
      $scope.errors = [];
      $scope.registerUser = function(user) {
        if(user.password_confirmation) {
          auth.create(user, function(err) {
            if(err) {
              console.log(err);
              return $scope.errors.push({msg: 'not able to sign in'});
            }
            $location.path('/logged_in');
          });
        } else {
          auth.signIn(user, function(err) {
            if(err) {
              console.log(err);
              return $scope.errors.push({msg: 'not able to create user'});
            }
            $location.path('/logged_in');
          });
        }
      };
  }]);
};
