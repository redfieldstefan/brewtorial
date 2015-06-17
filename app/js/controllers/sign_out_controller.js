'use strict';

module.exports = function(app) {

  SignOutController.$inject = ['$scope', '$http'];

  function SignOutController($scope, $http) {
    $scope.page = 'sign-out';

    function init() {
      
    }

    init();
    
  };  

  app.controller('SignOutController', SignOutController);

};
