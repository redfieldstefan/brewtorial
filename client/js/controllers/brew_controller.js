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
    $scope.errors = [];
    $scope.congrats = "CONGRATS! You've made a delicious brew";

    // restricted url, ensure user is authenticated. capture location for post-authentication redirect.
    if (!auth.isSignedIn()){
      $cookies.put('postAuthenticationRedirect', $location.path());
      $location.path('/sign_in');
    }

    $scope.totalTime = function(step){
      return ((step.offset.days * 86400000) + (step.offset.hours * 3600000) + (step.offset.minutes * 60000));
    };

    $scope.getBrew = function() {
      Brew.getOne(brewId, function(err, brew) {
        if (err){
          $scope.errors.push(err);
          return console.log({msg: 'Dang, error fetching the brew event'});
        }
        $scope.thisBrew = brew.data;
        $scope.steps = brew.data.steps;
        brew.data.steps.forEach(function(step) {
          if (step.active === true) {
            $scope.started = true;
            $scope.counter = $scope.totalTime(step);
          }
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
    };

    $scope.startBrew = function(){
      $scope.steps[0].active = true;
      $scope.counter = $scope.totalTime($scope.steps[0]);
      $scope.started = true;
      $scope.saveBrew();
    };

    $scope.startHere = function(step) {
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

// NEW TIMER FUNCTIONS
//THIS TIMER IS AN ALTERED FORM OF THE Days-Hours-Minutes-Seconds Counter script by Praveen Lobo
// *********************************************************************************************
// * Days-Hours-Minutes-Seconds Counter script by Praveen Lobo
// * (http://PraveenLobo.com/techblog/javascript-counter-count-days-hours-minutes-seconds/)
// * This notice MUST stay intact(in both JS file and SCRIPT tag) for legal use.
// * http://praveenlobo.com/blog/disclaimer/
// *********************************************************************************************

    var counterTimeout;
    $scope.startTimer = function(){
      var counterDate = new Date(Date.now() + $scope.counter);
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
        $scope.counter = $scope.counter - 1000;
      };
      var update=function(){
        calculate();
        if($scope.days === 0 && $scope.hours === 0 && $scope.mins === 0 && $scope.secs === 0) {
              $scope.brewing = false;
              $timeout.cancel(counterTimeout);
              return;
        }
        counterTimeout = $timeout(function(){
          update();
        }, (1000));
      };
      $scope.brewing = true;
      update();
    };
    $scope.stopTimer = function() {
      $scope.$broadcast('timer-stopped', $scope.counter);
      $timeout.cancel(counterTimeout);
      $scope.brewing = false;
    };
  }]);
};


//ORIGINAL TIMER FOR REFERENCE

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
