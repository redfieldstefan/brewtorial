'use strict';

module.exports = function(app) {

  app.controller('UserController', ['$scope', '$http', 'auth', '$cookies', '$location', function($scope, $http, auth, $cookies, $location) {

    var eat = $cookies.get('eat');
    $http.defaults.headers.common['eat'] = eat; //jshint ignore: line

    $scope.errors = [];
    $scope.user;
    $scope.users = [];

    $scope.getUsers = function() {
      $http.get('/api/users/get')
        .success(function(data) {
          console.log(data);
          $scope.users = data;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error getting user'});
      });
    };

    $scope.getUser = function(user) {
      $http.get('/api/users/get/profile', user)
        .success(function(data) {
          $scope.user = data.user;
          console.log($scope.user);
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error getting user'});
        });
    };

    $scope.deleteUser = function(user) {
      (function() {
        alert("are you sure you want to delete your profile? The decision is final");
      })();
      $scope.users.splice($scope.users.indexOf(user), 1);
      $http.delete('/api/users/remove')
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not delete user'});
        });
        $location.path('/register');
        console.log('deleted');
    };

    $scope.editUser = function(user) {
      user.editing = true;
      $scope.userCopy = angular.copy(user);
    };

    $scope.saveUser = function(user) {
      user.editing = false;
      $http.put('/api/users/update', user)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not update user'})
        });
    };

    $scope.cancelEdit = function(user) {
      user.displayName = $scope.userCopy.displayName;
      user.email = $scope.userCopy.email;
      user.editing = false;
      $scope.donutCopy = null;
    };

  }]);
};
