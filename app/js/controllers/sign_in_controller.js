'use strict';

module.exports = function(app) {

  SignInController.$inject = ['$scope', '$http'];

  function SignInController($scope, $http) {
    $scope.page = 'sign-in';

    function init() {
      
    }

    init();
    
  };  

  app.controller('SignInController', SignInController);

};
