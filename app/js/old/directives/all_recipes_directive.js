'use strict';

module.exports = function(app) {
  app.directive('allRecipesDirective', function() {
    return {
      restrict: 'A',
      template: '<li>recipe name: </li><li>difficulty: </li><li>time: </li><li>picture: </li><li>ingredients: </li><li>author: </li><li>popularity: </li>'
    };
  });
};
