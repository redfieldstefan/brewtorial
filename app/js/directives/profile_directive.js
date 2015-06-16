'use strict';

module.exports = function(app) {
  app.directive('profileDirective', function() {
    return {
      restrict: 'A',
      templateUrl: '/js/views/profile.html'
    };
  });
};
