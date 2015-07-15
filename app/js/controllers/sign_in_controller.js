'use strict';

var val = require('validator');

module.exports = function(app) {

  SignInController.$inject = ['$scope', '$http', 'auth', '$location', '$cookies'];

  function SignInController($scope, $http, auth, $location, $cookies) {
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
        if (err) {
          validationErrors.push('Credentials are invalid.');
          $scope.validationErrorMessage = validationErrors.join('\n');
          $scope.hasValidationErrors = true;
          // return $scope.errors.push({msg: 'not able to sign in user'});
        } else {
          if ($cookies.get('postAuthenticationRedirect') && $cookies.get('postAuthenticationRedirect').length) {
            var relocationPath = $cookies.get('postAuthenticationRedirect');
            $cookies.put('postAuthenticationRedirect', '');
            $location.path(decodeURIComponent(relocationPath));
          } else {
            $location.path('/profile');
          }

        }
      });
    };

  }

  app.controller('SignInController', SignInController);

};
