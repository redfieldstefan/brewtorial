'use strict';

module.exports = function(app) {

  app.controller('UserController', ['$scope', '$location', 'RESTResource', function($scope, $location, resource) {
    var User = resource('users');
    $scope.page = 'user';
    $scope.errors = [];
    $scope.user = {};

    $scope.getUser = function(user) {
      User.getOne(function(err, data) {
        if(err) {
          $scope.errors.push(err);
          return console.log({msg: 'could not get user'});
        }
        $scope.user = data;
      });
    };

    $scope.deleteUser = function(user) {
      User.remove(user, function(err, data) {
        if(err) {
          return $scope.errors.push({msg: 'could not delete user. sorry man.'});
        }
      });
    };

    $scope.editUser = function(user) {
      user.editing = true;
      $scope.userCopy = angular.copy(user);
    };

    $scope.saveUser = function(user) {
      user.editing = false;
      User.save(user, function(err, data) {
        if(err) {
          return $scope.errors.push({msg: 'could not update user'});
        }
      });
    };

    $scope.cancelEdit = function(user) {
      user.displayName = $scope.userCopy.displayName;
      user.email = $scope.userCopy.email;
      $scope.donutCopy = null;
    };

  }]);
};
