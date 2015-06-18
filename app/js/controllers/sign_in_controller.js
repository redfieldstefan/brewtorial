'use strict';

var val = require('validator');

module.exports = function(app) {

  SignInController.$inject = ['$scope', '$http', 'auth', '$location'];

  function SignInController($scope, $http, auth, $location) {
    $scope.page = 'sign_in';
    $scope.hasValidationErrors = false;
    $scope.validationErrorMessage = '';

    $scope.signIn = function(user) {

      var validationErrors = [];
      if (val.isNull(user)) { 
        validationErrors.push('Please fill out the form.');
      } else {
        if (val.isNull(user.email)) { validationErrors.push('Email is required.'); }
        if (val.isNull(user.password)) { validationErrors.push('Password is required.'); }
        if (!val.isEmail(user.email)) { validationErrors.push('Email address is an invalid format.'); }
      }

      if (validationErrors.length) {
        $scope.validationErrorMessage = validationErrors.join('\n');
        $scope.hasValidationErrors = true;
        return false;
      }

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
