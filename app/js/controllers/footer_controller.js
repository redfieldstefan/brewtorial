'use strict';

module.exports = function(app) {
  app.controller('footerController', ['$scope', '$location', function($scope, $location){

    $scope.redirect = function(destination) {
      $location.path('/' + destination);
    }
  }]);
};
