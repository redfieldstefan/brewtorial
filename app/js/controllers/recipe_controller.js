module.exports = function(app) {
  app.controller('RecipeController', ['$scope', 'RESTResource', '$routeParams', '$location', function($scope, resource, $routeParams, $location) {
    $scope.page = 'recipe';
    var Recipe = resource('recipe');
    var NewBrewEvent = resource('/brew/newbrew');
    $scope.errors = [];
    $scope.header = {};
    $scope.ingredients = [];
    $scope.equipment = [];
    $scope.steps = [];
    $scope.id = '';

    $scope.getRecipe = function() {
      var recipeId = $routeParams.id;

      Recipe.getOne(recipeId, function(err, recipe) {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'Problem finding resource'});
        }
        $scope.description = recipe.description;
        $scope.header = recipe.result.header;
        $scope.ingredients = recipe.result.ingredients;
        $scope.equipment = recipe.result.equipment;
        $scope.steps = recipe.result.steps;
        $scope.id = recipe.result._id;
      });
    };

    $scope.returnToRecipes = function() {
      $location.path('/recipes');
    }

    $scope.createBrewEvent = function() {
      var newBrew = {
        title: $scope.header.title,
        ingredients: $scope.ingredients,
        steps: $scope.steps
      };

      NewBrewEvent.create(newBrew, function(err, res) {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'Problem finding resource'});
        }
        var id = res.data._id;
        $location.path('/brews/' + id);
      });
    };
  }]);
};
