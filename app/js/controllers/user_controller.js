'use strict';

module.exports = function(app) {

  app.controller('UserController', ['$scope', '$http', 'auth', '$cookies', '$location', function($scope, $http, auth, $cookies, $location) {

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if(!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    var eat = $cookies.get('eat');
    $http.defaults.headers.common['eat'] = eat; //jshint ignore: line
    $scope.page = 'profile';
    $scope.errors = [];
    $scope.user;
    $scope.users = [];
    $scope.userBrews;

    $scope.gotoRecipes = function() {
      $location.path('/recipes');
    };

    $scope.getUsers = function() {
      $http.get('/api/users/get')
        .success(function(data) {
          console.log(data);
          $scope.users = data;
          $scope.userBrews = data.currentBrews;
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
        var rigthAnswer = 'yes';
        var areYouSure = prompt("Are you sure you want to delete your profile? The decision is final. Type 'yes' if you want to delete your account.");
        if(areYouSure === rigthAnswer) {
          $scope.users.splice($scope.users.indexOf(user), 1);
          $http.delete('/api/users/remove')
            .error(function(data) {
              console.log(data);
              $scope.errors.push({msg: 'could not delete user'});
            });
            $location.path('/register');
            console.log('deleted');
        }
      })();
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

    $scope.goToBrew = function(id){
      $location.path('/brews/' + id);
    }

  }]);
};
