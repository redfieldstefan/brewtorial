"use strict";

module.exports = function(app) {
  app.controller("profileController", ["$scope", "$http", function($scope, $http) {
    $scope.errors = [];
    $scope.profile = [];

    $scope.editProfile = function(user) {

    }

  }]);
};
