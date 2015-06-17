'use strict';

module.exports = function(app) {

  app.controller('RegisterController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
      $scope.page = 'register';
      if(auth.isSignedIn()) {
        $location.path('/dashboard');
      }
      $scope.errors = [];
      $scope.registerUser = function(user) {
        auth.create(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'not able to sign in'});
          }
          $location.path('/dashboard');
        });
      };
  }]);

};
