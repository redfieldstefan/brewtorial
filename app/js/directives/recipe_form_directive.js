'use strict';

module.exports = function(app){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'js/views/create_recipe.html',
    scope: {
        save: '&',
        reset: '&',
        buttonText: '=',
        labelText: '@',
        rant: '='
      },
      transclude: true
  }
};
