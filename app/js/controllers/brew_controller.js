'use strict';

module.exports = function(app) {

  app.controller('BrewController', ['$scope', '$location', '$timeout', '$routeParams', 'RESTResource', 'auth', '$cookies', function($scope, $location, $timeout, $routeParams, resource, auth, $cookies) {
    var Brew = resource('brew');
    $scope.thisBrew = {};
    $scope.errors = [];
    $scope.ingredients;
    $scope.steps;
    $scope.title;
    $scope.description;
    $scope.counter;
    $scope.complete = false;
    $scope.congrats="CONGRATS! You've made a delicious brew"

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if (!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    $scope.saveBrew = function() {
      Brew.save($scope.thisBrew, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'could not move to next step'});
        }
        console.log('save successful');
      });
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
        $scope.counter = $scope.steps[0].offset;
      });
    };

    $scope.startBrew = function(){
      $scope.steps[0].status = true;
      $scope.counter = $scope.steps[0].offset;
      $scope.saveBrew();
    };

    $scope.nextStep = function(current, next) {
      current.active = false;
      current.done = true;
      next.active = true;
      if(!next.done){
        $scope.counter = next.offset;
        saveBrew();
      }
      if(!next){
        $scope.complete = true;
        $scope.saveBrew();

      }
    };

    $scope.startHere = function(step) {
      $scope.counter = step.offset;
      $scope.steps.forEach(function(step){
        step.done = false;
      })
    };


    $scope.prevStep = function(current, prev) {
      current.active = false;
      prev.active = true;
    };

    $scope.completeBrew = function(current, prev) {
      current.active = false;
      prev.active = true;
    };



    //TIMER FUNCTIONS

    var mytimeout = null; // the current timeoutID
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 100);
    };

    $scope.startTimer = function() {
        console.log('start');
        mytimeout = $timeout($scope.onTimeout, 1000);
    };

    $scope.stopTimer = function() {
        console.log('stop');
        $scope.$broadcast('timer-stopped', $scope.counter);
        $timeout.cancel(mytimeout);
    };
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
        }
    });
  }]);
};
