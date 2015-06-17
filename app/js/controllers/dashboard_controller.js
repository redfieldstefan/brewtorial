'use strict';

module.exports = function(app) {

  DashboardController.$inject = ['$scope', '$http'];

  function DashboardController($scope, $http) {  
    $scope.page = 'dashboard';
    $scope.beerTally = 0;
    $scope.sortOrder = false;
    $scope.sortBy = 'name';
    $scope.list = [];

    function init() {
      
      // FIX THIS, GET DATA REMOTELY
      $scope.list = [
        {
          _id: '0123456789',
          title: 'SkunkBroo',
          type: 'Lager',
          abv: 6.25,
          rank: 1,
          created: new Date(2015, 0, 1)        
        },
        {
          _id: '2468013579',
          title: 'Brewlicious',
          type: 'Ale',
          abv: 7,
          rank: 3,
          created: new Date(2015, 3, 12)        
        },
        {
          _id: '1357924680',
          title: 'Junky Jo\'s Gutrot',
          type: 'Ale',
          abv: 5.5,
          rank: 2,
          created: new Date(2014, 11, 16)        
        }
      ];
    }

    init();

    $scope.sort = function(propName) {
      $scope.sortBy = propName;
      $scope.sortOrder = !$scope.sortOrder;
    };
    
  };  

  app.controller('DashboardController', DashboardController);

};
