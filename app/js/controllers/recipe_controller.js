module.exports = function(app) {
  app.controller('RecipeController', ['$scope', 'RESTResource', '$routeParams', '$location', function($scope, resource, $routeParams, $location) {
    $scope.page = 'recipe';

    var Recipe = resource('recipe');
    $scope.errors = [];
    $scope.header;
    $scope.ingredients = [];
    $scope.equipment = [];
    $scope.steps = [];
    $scope.id;

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
        $scope.id = data.result._id;
      });
    };

    $scope.triggerBrewEvent = function(id) {
      $location.path('/brews/' + id);
    };
  }]);
};
