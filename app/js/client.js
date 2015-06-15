'use strict';

require('angular/angular');
require('angular-route');

var brewApp = angular.module('brewApp', ['ngRoute']);

//services

//controllers
require('./controllers/all_recipes_controller.js')(brewApp);
require('./controllers/profile_controller')(brewApp);

//directives
require('./directives/all_recipes_directive')(brewApp);
require('./directives/profile_directive')(brewApp);

brewApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/all_recipes', {
      templateUrl: '/js/views/all_recipes.html',
      controller: 'allRecipesController'
    })
    .when('/profile', {
      templateUrl: '/js/views/profile.html'
    })
    .when('/create_user', {
      templateUrl: '/js/views/create_user.html'
    })
    .when('/sign_in', {
      templateUrl: '/js/views/sign_in.html'
    })
    .when('/brew_process', {
      templateUrl: '/js/views/brew_process_directive.html'
    })
    .when('/', {
      templateUrl: '/js/views/all_recipes.html',
      controller: 'allRecipesController'
    })
    .otherwise({
      redirectTo: '/create_user'
    });
}]);
