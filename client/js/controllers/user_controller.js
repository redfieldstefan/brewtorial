'use strict';

module.exports = function(app) {

  app.controller('UserController', ['$scope', 'RESTResource', '$cookies', 'auth', '$location', function($scope, resource, $cookies, auth, $location) {

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if(!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    var User = resource('users');
    var Profile = resource('users/profile');

    $scope.page = 'profile';
    $scope.errors = [];
    $scope.users = [];
    // $scope.user;
    // $scope.currentBrews;
    // $scope.completedBrews;

    $scope.gotoRecipes = function() {
      $location.path('/recipes');
    };

    $scope.getUser = function() {
      Profile.getAll(function(err, data) {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'Could not fetch profile'});
        }
        $scope.user = data.user;
        $scope.currentBrews = data.user.currentBrews;
        $scope.completedBrews = data.user.completedBrews;
      });
    };

    $scope.deleteUser = function(user) {
      var areYouSure = prompt('Are you sure you want to delete your profile forever? Type "Yes" to confirm.'); // jshint ignore:line
      if (areYouSure.toLowerCase() === 'yes') {
        $scope.users.splice($scope.users.indexOf(user), 1);
        $location.path('/dashboard');
        auth.logout();

        User.remove(user._id, function(err, data) {
          if (err) {
            console.log(err);
            return $scope.errors.push({msg: 'Could not remove user'});
          }
        });
      }
    };

    $scope.editUser = function(user) {
      user.editing = true;
      $scope.userCopy = angular.copy(user);
    };

    $scope.saveUser = function(user) {
      user.editing = false;
      User.save(user._id, user, function(err, data) {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'Could not save user'});
        }
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
      }
      $scope.saveUser($scope.user);
    };

    $scope.removePastBrew = function(brew) {
      var pastBrews = $scope.completedBrews;
      for (var i = 0; i < pastBrews.length; i++) {
        if(brew === pastBrews[i].id){
          pastBrews.splice(pastBrews.indexOf(pastBrews[i]), 1);
        }
      }
      $scope.saveUser($scope.user);
    };

    $scope.goToBrew = function(id){
      $location.path('/brews/' + id);
    };

  }]);
};
