'use strict';

var val = require('validator');
var User = require('../../../models/User');

module.exports = function(app) {

  app.controller('RegisterController', ['$scope', '$location', 'auth', '$http', function($scope, $location, auth, $http) {
      $scope.page = 'register';
      $scope.hasValidationErrors = false;
      $scope.validationErrorMessage = '';

      if(auth.isSignedIn()) { $location.path('/dashboard'); }

      $scope.errors = [];
      $scope.registerUser = function(user) {

        // validate user registration.
        var validationErrors = [];
        if (val.isNull(user)) { validationErrors.push('Please fill out the form.'); }
        else {
          User.find({basic.email: user.email}, function(err, result) {
            if (result.length) { validationErrors.push('Email is not unique.'); }
          });
          if (val.isNull(user.email)) { validationErrors.push('Email is required.'); }
          if (val.isNull(user.displayName)) { validationErrors.push('Username is required.'); }
          if (val.isNull(user.password)) { validationErrors.push('Password is required.'); }
          if (val.isNull(user.password_confirmation)) { validationErrors.push('Password confirmation is required.'); }
          if (!val.isEmail(user.email)) { validationErrors.push('Email address is an invalid format.'); }
          if (!val.equals(user.password, user.password_confirmation)) { validationErrors.push('Passwords do not match.')}
        }
        // verify email unique

        if (validationErrors.length) {
          $scope.validationErrorMessage = validationErrors.join('\n');
          $scope.hasValidationErrors = true;
          return false;
        }

        auth.create(user, function(err) {
          if (err) {
            console.log(err);
            return $scope.errors.push({msg: 'not able to sign in'});
          }
          $location.path('/dashboard');
        });
        
      };
  }]);

};
