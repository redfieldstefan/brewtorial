'use strict';

module.exports = function(app) {
  app.directive('footerDirective', function() {
    return {
      restrict: 'EA',
      controller: 'footerController',
      templateUrl: 'views/directives/footer_template.html'
    };
  });
};
