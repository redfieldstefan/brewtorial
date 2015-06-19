'use strict';

module.exports = function(app) {

  app.controller('UserController', ['$scope', '$http', 'auth', '$cookies', '$location', function($scope, $http, auth, $cookies, $location) {

  // app.controller('UserController', ['$scope', 'RESTResource', '$routeParams', '$location', function($scope, resource, $routeParams, $location) {
  //   $scope.page = 'user';
    var eat = $cookies.get('eat');
    $http.defaults.headers.common['eat'] = eat; //jshint ignore: line

    // var Users = resource('users/get');
    // var OneUser = resource('users/get/profile');

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
      $scope.users.splice($scope.users.indexOf(user), 1);
      $http.delete('/api/users/remove')
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not delete user'});
        });
        $location.path('/register');
        console.log('deleted');
    };

  }]);
};
