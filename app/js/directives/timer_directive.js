'use strict';

module.exports = function(app) {

  app.directive('timer', function() {
    return {
      restrict: 'EA',
      controller: 'NavHeaderController',
      templateUrl: 'views/directives/timer.html',
       scope: {
        start: '&',
        stop: '&',
      },
    };
  });

};
