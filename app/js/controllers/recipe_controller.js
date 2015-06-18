module.exports = function(app) {
  app.controller('RecipeController', ['$scope', 'RESTResource', '$routeParams', '$location', function($scope, resource, $routeParams, $location) {
    $scope.page = 'recipe';
    var NewBrewEvent = resource('/brew/newbrew');

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
          return $scope.errors.push({msg: 'Problem finding resource'});
        }

        $scope.description = data.description;
        $scope.header = data.result.header;
        $scope.ingredients = data.result.ingredients;
        $scope.equiptment = data.result.equipment;
        $scope.steps = data.result.steps;
        $scope.id = data.result._id;
      });
    };

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
    }
  }]);
};
