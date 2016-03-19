'use strict';

module.exports = function(app) {

  app.directive('navHeader', function() {
    return {
      restrict: 'EA',
      scope: {
        logout: '&'
      },
      controller: 'NavHeaderController',
      templateUrl: 'views/directives/nav_header.html'
    };
  });

};
