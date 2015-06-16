'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var brewApp = angular.module('brewApp', ['ngRoute', 'ngCookies', 'base64']);

//services
require('../auth/auth_service.js')(brewApp);

//controllers
require('./controllers/all_recipes_controller.js')(brewApp);
require('./controllers/profile_controller')(brewApp);
require('../auth/auth_controller')(brewApp);

//directives
require('./directives/all_recipes_directive')(brewApp);
require('./directives/profile_directive')(brewApp);
require('../auth/logout_directive')(brewApp);

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
    .when('/logged_in', {
      templateUrl: '/js/views/logged_in_landing.html'
    })
    .when('/', {
      redirectTo: '/logged_in'
    })
    .otherwise({
      templateUrl: '/js/views/landing.html'
    });
}]);
