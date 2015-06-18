'use strict';

module.exports = function(app) {

  app.controller('BrewController', ['$scope', '$location', '$routeParams', '$timeout', 'RESTResource', function($scope, $location, $routeParams, $timeout, resource) {
    var Brew = resource('brew');
    $scope.thisBrew;
    $scope.errors = [];
    $scope.ingredients;
    $scope.steps;
    $scope.title;
    $scope.description;

    $scope.getBrew = function() {
      Brew.getOne($routeParams, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error fetching the brew event'});
        }
        $scope.thisBrew = data.data;
        console.log($scope.thisBrew)
        $scope.steps = data.data.steps;
        $scope.ingredients = data.data.ingredients;
        $scope.title = data.data.title;
        $scope.description = data.data.description;
      });
    };

    $scope.startBrew = function(){
      $scope.steps[0].status = true;
      console.log('started')
    };

    $scope.startStep = function(step) {
      step.status = true;
      console.log($scope.thisBrew);
      Brew.save($scope.thisBrew, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'could not move to next step'});
        }
        console.log('save successful')
      });
    }

    //TIMER FUNCTIONS

    $scope.counter = 83;
    var mytimeout = null; // the current timeoutID
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 90;
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


