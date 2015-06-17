'use strict';

module.exports = function(app) {

  NavHeaderController.$inject = ['$scope', '$http', 'auth'];

  function NavHeaderController($scope, $http, auth) {
    $scope.signOutUser = function() {
      auth.logout();
    };    
  };  

  app.controller('NavHeaderController', NavHeaderController);

};
