'use strict';

module.exports = function(app) {

  LandingController.$inject = ['$scope', '$location', 'RESTResource'];

  function LandingController($scope, $location, resource) {
    var greetings = [
      'Re-brew-nited<br>and it tastes so good.',
      'Your Kung-brew<br>is strong, grasshoppa.',
      'Keep away!<br>I know tae kwon brew!',
      'Our dog\'s name is<br>Suds McKenzie.',
      'The beau coup<br>brew crew.',
      'Welcome to counter-<br>productivity.'
    ];

    var Service = resource('service');
    $scope.greeting = greetings[Math.floor(Math.random()*greetings.length)];
    $scope.page = 'landing';
    $scope.errors = [];
    $scope.tallies = {
      users: 0,
      recipes: 0,
      craftings: 0
    };

    $scope.getLandingTallies = function() {
      Service.create({method: 'getLandingTallies'}, function(err, data) {
        if (err) console.log(err);

        $scope.tallies = data.result;
      });
    };

    $scope.redirect = function(destination) {
      $location.path('/' + destination)
    }
  }

  app.controller('LandingController', LandingController);

};
