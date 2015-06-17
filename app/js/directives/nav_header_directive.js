'use strict';

module.exports = function(app) {

  app.directive('navHeader', function() {
    return {
      restrict: 'EA',
      controller: 'NavHeaderController',
      templateUrl: 'views/directives/nav_header_directive.html'
    };
  });

};
