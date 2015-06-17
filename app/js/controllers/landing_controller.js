'use strict';

module.exports = function(app) {

  LandingController.$inject = ['$scope'];

  function LandingController($scope) {
    var greetings = [
      'Re-brew-nited<br>and it tastes so good.',
      'Your Kung-brew<br>is strong, grasshoppa.',
      'Keep away!<br>I know tae kwon brew!'
    ];
    $scope.greeting = greetings[Math.floor(Math.random()*greetings.length)];
    $scope.page = 'landing';
    $scope.tallies = {
      users: 0,
      recipes: 0,
      craftings: 0
    };

  };  

  app.controller('LandingController', LandingController);

};
