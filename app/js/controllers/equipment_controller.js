'use strict';

module.exports = function(app) {

  EquipmentController.$inject = ['$scope', '$http'];

  function EquipmentController($scope, $http) {
    $scope.page = 'equipment';

    function init() {

    }

    init();

  }

  app.controller('EquipmentController', EquipmentController);

};
