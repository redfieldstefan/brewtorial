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
    $scope.currentBrews;
    $scope.completedBrews;

    $scope.gotoRecipes = function() {
      $location.path('/recipes');
    };

    $scope.getUsers = function() {
      $http.get('/api/users/')
        .success(function(data) {
          $scope.users = data;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error getting user'});
        });
    };

    $scope.getUser = function(user) {
      $http.get('/api/users/profile', user)
        .success(function(data) {
          $scope.user = data.user;
          $scope.currentBrews = data.user.currentBrews;
          $scope.completedBrews = data.user.completedBrews;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error getting user'});
        });
    };

    $scope.deleteUser = function(user) {
      var areYouSure = prompt('Are you sure you want to delete your profile forever? Type "Yes" to confirm.');
      if (areYouSure.toLowerCase() === 'yes') {
        $scope.users.splice($scope.users.indexOf(user), 1);
        $location.path('/register');
        auth.logout();
        $http.delete('/api/users')
          .success(function(data) {
            console.log('deleted');
          })
          .error(function(data) {
            console.log('err:', data);
            $scope.errors.push({msg: 'could not delete user'});
          });
      }
    };

    $scope.editUser = function(user) {
      user.editing = true;
      $scope.userCopy = angular.copy(user);
    };

    $scope.saveUser = function(user) {
      if(user.editing) {
        user.editing = false;
      }
      $http.put('/api/users', user)
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

    $scope.removeCurrentBrew = function(brew) {
      var currentBrews = $scope.currentBrews;
      for (var i = 0; i < currentBrews.length; i++) {
        if(brew === currentBrews[i].id){
          currentBrews.splice(currentBrews.indexOf(currentBrews[i]), 1);
        }
      };
      $scope.saveUser($scope.user);
    };

    $scope.removePastBrew = function(brew) {
      var pastBrews = $scope.completedBrews;
      for (var i = 0; i < pastBrews.length; i++) {
        if(brew === pastBrews[i].id){
          pastBrews.splice(pastBrews.indexOf(pastBrews[i]), 1);
        }
      };
      $scope.saveUser($scope.user);
    };

    $scope.goToBrew = function(id){
      $location.path('/brews/' + id);
    }

  }]);
};
