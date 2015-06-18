module.exports = function(app) {
  app.controller('RecipeController', ['$scope', 'RESTResource', '$routeParams', function($scope, resource, $routeParams) {
    $scope.page = 'recipe';

    var Recipe = resource('recipe');
    $scope.errors = [];
    $scope.header;
    $scope.ingredients = [];
    $scope.equipment = [];
    $scope.steps = [];

    $scope.getRecipe = function() {
      Recipe.getOne($routeParams, function(err, data) {
        if (err) {
          console.log(err);
          $scope.errors.push({msg: 'Problem finding resource'});
        }

        $scope.header = data.result.header;
        $scope.ingredients = data.result.ingredients;
        $scope.equipment = data.result.equipment;
        $scope.steps = data.result.steps;
      });
    }
  }]);
};
