'use strict';

module.exports = function(app) {

  app.controller('BrewController', ['$scope', '$location', '$routeParams', 'RESTResource', 'auth', '$cookies', function($scope, $location, $routeParams, resource, auth, $cookies) {
    var Brew = resource('brew');
    $scope.thisBrew = {};
    $scope.errors = [];
    $scope.ingredients = [];
    $scope.steps = [];
    $scope.title = '';
    $scope.description = '';

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if (!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    $scope.getBrew = function() {
      Brew.getOne($routeParams, function(err, brew) {
        if (err){
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error fetching the brew event'});
        }

        $scope.thisBrew = brew.data;
        $scope.steps = brew.data.steps;
        $scope.ingredients = brew.data.ingredients;
        $scope.title = brew.data.title;
        $scope.description = brew.data.description;
      });
    };

    $scope.startBrew = function(){
      $scope.steps[0].status = true;
      console.log('started');
    };

    $scope.startStep = function(step) {
      step.status = true;
      console.log($scope.thisBrew);
      Brew.save($scope.thisBrew, function(err, data) {
        if (err){
          $scope.errors.push(err);
          return console.log({msg: 'could not move to next step'});
        }

        console.log('save successful');
      });
    };

    $scope.startTime = function(time) {
    };

    $scope.stopTime = function(time){
    };

    $scope.resetTime = function(time){
    };

  }]);
};
