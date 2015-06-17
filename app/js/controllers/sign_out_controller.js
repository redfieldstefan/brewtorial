'use strict';

module.exports = function(app) {

  SignOutController.$inject = ['$scope', '$http', 'auth'];

  function SignOutController($scope, $http, auth) {
    $scope.page = 'sign-out';

    $scope.signOutUser = function() {
      auth.logout();
    };
    
  };  

  app.controller('SignOutController', SignOutController);

};
