'use strict';

module.exports = function(app) {

  app.controller('BrewController', ['$scope', '$location', '$timeout', '$routeParams', 'RESTResource', 'auth', '$cookies', function($scope, $location, $timeout, $routeParams, resource, auth, $cookies) {

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if(!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    var Brew = resource('brew');
    var brewId = $routeParams.id;
    $scope.page = 'brew';
    $scope.thisBrew;
    $scope.errors = [];
    $scope.ingredients;
    $scope.steps;
    $scope.title;
    $scope.description;
    $scope.counter;
    $scope.now = Date.now();
    $scope.days;
    $scope.hours;
    $scope.mins;
    $scope.secs;
    $scope.started = false;
    $scope.congrats="CONGRATS! You've made a delicious brew"

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if (!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    $scope.totalTime = function(step){
      return ((step.offset.days * 86400000) + (step.offset.hours * 3600000) + (step.offset.minutes * 60000))
    };

    $scope.getBrew = function() {
      Brew.getOne(brewId, function(err, brew) {
        if (err){
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error fetching the brew event'});
        }
        $scope.thisBrew = brew.data;
        $scope.steps = brew.data.steps;
        $scope.ingredients = brew.data.ingredients;
        $scope.title = brew.data.title;
        $scope.description = brew.data.description;
        $scope.steps.forEach(function(step) {
          if (step.active === true) {
            $scope.counter = $scope.totalTime(step);
          };
        });
      });
    };

    $scope.saveBrew = function() {
      Brew.save(brewId, $scope.thisBrew, function(err, data) {
        if(err){
          $scope.errors.push(err);
          return console.log({msg: 'could not move to next step'});
        }
        console.log('save successful');
      });
    }

    $scope.startBrew = function(){
      $scope.steps[0].active = true;
      $scope.counter = $scope.totalTime($scope.steps[0]);
      // $scope.counter = $scope.steps[0].offset;
      $scope.started = true;
      $scope.saveBrew();
    };

    $scope.startHere = function(step) {
      // $scope.counter = step.offset;
      $scope.counter = $scope.totalTime(step);
      $scope.thisBrew.complete = false;
      $scope.steps.forEach(function(step){
        step.done = false;
      });
      $scope.saveBrew();
    };

    $scope.nextStep = function(current, next) {
      if(!next){
        $scope.thisBrew.complete = true;
        $scope.saveBrew();
        return console.log('done');
      }
      $scope.stopTimer();
      current.active = false;
      current.done = true;
      next.active = true;
      $scope.saveBrew();
      if(!next.done){
        // $scope.counter = next.offset;
        $scope.counter = $scope.totalTime(next);
        $scope.saveBrew();
      }
      if(!next){
        $scope.complete = true;
        $scope.saveBrew();
      }
    };

    $scope.prevStep = function(current, prev) {
      current.active = false;
      prev.active = true;
    };

    //TIMER FUNCTIONS

    // var mytimeout = null; // the current timeoutID
    // // actual timer method, counts down every second, stops on zero
    // $scope.onTimeout = function() {
    //   if($scope.counter ===  0) {
    //     $scope.$broadcast('timer-stopped', 0);
    //     $timeout.cancel(mytimeout);
    //     return;
    //   }
    //   $scope.counter.minutes--;
    //   mytimeout = $timeout($scope.onTimeout, 1000);
    // };

    // $scope.startTimer = function() {
    //   console.log('start');
    //   mytimeout = $timeout($scope.onTimeout, 1000);
    // };

    // $scope.stopTimer = function() {
    //   console.log('stop');
    //   $scope.$broadcast('timer-stopped', $scope.counter);
    //   $timeout.cancel(mytimeout);
    // };
    // // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    // $scope.$on('timer-stopped', function(event, remaining) {
    //   if(remaining === 0) {
    //     console.log('your time ran out!');
    //   }
    // });

  //END INITIAL TIMER

    var counterTimeout;
    $scope.startTimer = function(){
      var counterDate = new Date($scope.now + $scope.counter);
      console.log($scope.counter);
      var calculateUnit = function(secDiff, unitSeconds){
        var tmp = Math.abs((tmp = secDiff/unitSeconds)) < 1? 0 : tmp;
        return Math.abs(tmp < 0 ? Math.ceil(tmp) : Math.floor(tmp));
      };
      var calculate = function(){
        var secDiff = Math.abs(Math.round(((new Date()) - counterDate)/1000));
        $scope.days = calculateUnit(secDiff,86400);
        $scope.hours = calculateUnit((secDiff-($scope.days*86400)),3600);
        $scope.mins = calculateUnit((secDiff-($scope.days*86400)-($scope.hours*3600)),60);
        $scope.secs = calculateUnit((secDiff-($scope.days*86400)-($scope.hours*3600)-($scope.mins*60)),1);
      };
      var update=function(){
        calculate();
        counterTimeout = $timeout(function(){update();}, (1000));
      };
      update();
    };

    $scope.stopTimer = function() {
      console.log('stop');
      $scope.$broadcast('timer-stopped', $scope.counter);
      $timeout.cancel(counterTimeout);
    };

  }]);
};




// $scope.totalTime = function(step){
//   if(!step.offset.days){
//     if(!step.offset.hours){
//       return step.offset.minutes * 60000;
//     }
//     if(!step.offset.minutes) {
//       return step.offset.hours * 3600000;
//     }
//     return (step.offset.hours * 3600000) + (step.offset.minutes * 60000);
//   } else if (!step.offset.hours) {
//       if(!step.offset.days){
//         return step.offset.minutes * 60000;
//       }
//       if(!step.offset.minutes) {
//         return step.offset.days * 3600000;
//       }
//       return (step.offset.days * 86400000) + (step.offset.minutes * 60000);
//   } else if (!step.offset.minutes) {
//       if(!step.offset.days){
//         return step.offset.hours * 3600000;
//       }
//       if(!step.offset.hours) {
//         return step.offset.days * 3600000;
//       }
//       return (step.offset.days * 86400000) + (step.offset.hours * 3600000);
//   }
//   return ((step.offset.days * 86400000) + (step.offset.hours * 3600000) + (step.offset.minutes * 60000))
// };
