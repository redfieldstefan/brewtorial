module.exports = function(app) {
  app.controller('RecipeController', ['$scope', '$anchorScroll', 'RESTResource', '$routeParams', '$location', function($scope, $anchorScroll, resource, $routeParams, $location) {
    $scope.page = 'recipe';
    var Recipe = resource('recipe');
    var NewBrewEvent = resource('/brew/newbrew');
    $scope.errors = [];
    $scope.recicpe = {};
    // $scope.header = {};
    // $scope.ingredients = [];
    // $scope.equipment = [];
    // $scope.steps = [];
    // $scope.id = '';
    // $scope.description = '';
    $scope.recipeId = $routeParams.id;

    $scope.getRecipe = function() {
      Recipe.getOne($scope.recipeId, function(err, recipe) {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'Problem finding resource'});
        }
        $scope.recipe = recipe.result;
        // $scope.description = recipe.result.description;
        // $scope.header = recipe.result.header;
        // $scope.ingredients = recipe.result.ingredients;
        // $scope.equipment = recipe.result.equipment;
        // $scope.steps = recipe.result.steps;
        // $scope.id = recipe.result._id;
      });
    };

    $scope.returnToRecipes = function() {
      $location.path('/recipes');
    }

    $scope.createBrewEvent = function(user) {
      var newBrew = {
        title: $scope.recipe.header.title,
        ingredients: $scope.recipe.ingredients,
        steps: $scope.recipe.steps
      };
      $scope.recipe.header.popularity.push(user);
      Recipe.save($scope.recipeId, $scope.recipe, function(err, res){
        if(err) {
          console.log(err);
        }
      });
      NewBrewEvent.create(newBrew, function(err, res) {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'Problem finding resource'});
        }
        var id = res.data._id;
        $location.path('/brews/' + id);
        $anchorScroll();
      });
    };
  }]);
};
