'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var brewApp = angular.module('brewApp', ['ngRoute', 'ngCookies', 'base64']);

//services
require('../auth/auth_service')(brewApp);
require('./services/rest_resource')(brewApp);

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
      templateUrl: '../views/all_recipes.html',
      controller: 'allRecipesController'
    })
    .when('/create_recipe', {
      templateUrl: '../views/create_recipe.html',
      controller: 'allRecipesController'
    })
    .when('/profile', {
      templateUrl: '../views/profile.html'
    })
    .when('/create_user', {
      templateUrl: '../views/create_user.html'
    })
    .when('/sign_in', {
      templateUrl: '../views/sign_in.html'
    })
    .when('/logged_in', {
      templateUrl: '../views/logged_in_landing.html'
    })
    .when('langing', {
      templateUrl: '../view/landing.html'
    })
    .when('/', {
      templateUrl: '../views/logged_in_landing.html'
    })
    .otherwise({
      templateUrl: '../views/landing.html'
    });
}]);
