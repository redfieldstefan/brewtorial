'use strict';

module.exports = function(app) {

  SignInController.$inject = ['$scope', '$http', 'auth', '$location'];

  function SignInController($scope, $http, auth, $location) {
    $scope.page = 'sign_in';
    $scope.signIn = function(user) {
      auth.signIn(user, function(err) {
        if(err) {
          console.log(err);
          return $scope.errors.push({msg: 'not able to create user'});
        }
        $location.path('/dashboard');
      });
    };  
    
  };  

  app.controller('SignInController', SignInController);

};
