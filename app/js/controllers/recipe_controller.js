module.exports = function(app) {
  app.controller('RecipeController', ['$scope', '$anchorScroll', 'RESTResource', 'auth', '$routeParams', '$location', function($scope, $anchorScroll, resource, auth, $routeParams, $location) {
    $scope.page = 'recipe';
    var Recipe = resource('recipe');
    var NewBrewEvent = resource('/brew/newbrew');
    $scope.errors = [];
    $scope.recipe = {};
    $scope.recipeId = $routeParams.id;

    $scope.getRecipe = function() {
      Recipe.getOne($scope.recipeId, function(err, recipe) {
        if (err) {
          console.log(err);
          return $scope.errors.push({msg: 'Problem finding resource'});
        }
        $scope.recipe = recipe.result;
      });
    };

    $scope.returnToRecipes = function() {
      $location.path('/recipes');
    };

    $scope.createBrewEvent = function(user) {
      var newBrew = {
        title: $scope.recipe.header.title,
        icon: $scope.recipe.header.icon,
        ingredients: $scope.recipe.ingredients,
        steps: $scope.recipe.steps
      };

      $scope.recipe.header.popularity.push(user);
      Recipe.save($scope.recipeId, $scope.recipe, function(err, res){
        if(err) {
          console.log(err);
        }
      });

      if (!auth.isSignedIn()){
        $location.path('/register');
      }

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
