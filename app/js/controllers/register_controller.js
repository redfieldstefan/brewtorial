'use strict';

module.exports = function(app) {

  RegisterController.$inject = ['$scope', '$http'];

  function RegisterController($scope, $http) {
    $scope.page = 'register';

    function init() {
      
    }

    init();
    
  };  

  app.controller('RegisterController', RegisterController);

};
