'use strict';

module.exports = function(app) {

  UserController.$inject = ['$scope', '$http'];

  function UserController($scope, $http) {
    $scope.page = 'user';

    function init() {
      
    }

    init();
    
  };  

  app.controller('UserController', UserController);

};
