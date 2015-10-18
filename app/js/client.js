'use strict';

// import modules.
require('angular/angular');
require('angular-route');
require('angular-sanitize');
require('angular-cookies');
require('angular-base64');

// application.
var brewtorialApp = angular.module('brewtorialApp', ['ngRoute', 'ngCookies', 'base64', 'ngSanitize']);

// services.
require('./services/auth_service')(brewtorialApp);
require('./services/rest_resource')(brewtorialApp);

// controllers.
require('./controllers/brew_controller')(brewtorialApp);
require('./controllers/create_recipe_controller')(brewtorialApp);
require('./controllers/footer_controller')(brewtorialApp);
require('./controllers/landing_controller')(brewtorialApp);
require('./controllers/nav_header_controller')(brewtorialApp);
require('./controllers/recipe_controller')(brewtorialApp);
require('./controllers/all_recipes_controller')(brewtorialApp);
require('./controllers/register_controller')(brewtorialApp);
require('./controllers/sign_in_controller')(brewtorialApp);
require('./controllers/sign_out_controller')(brewtorialApp);
require('./controllers/timer_controller')(brewtorialApp);
require('./controllers/user_controller')(brewtorialApp);

// directives.
require('./directives/nav_header_directive')(brewtorialApp);
require('./directives/footer_directive')(brewtorialApp);
require('./directives/timer_directive')(brewtorialApp);

// routes.
brewtorialApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    // .when('/', {
    //   templateUrl: 'views/landing.html',
    //   controller: 'LandingController'
    // })
    .when('/', {
      templateUrl: 'views/all_recipes.html',
      controller: 'AllRecipesController'
    })
    .when('/brews/:id', {
      templateUrl: 'views/brew.html',
      controller: 'BrewController'
    })
    .when('/create_recipe', {
      templateUrl: 'views/create_recipe.html',
      controller: 'CreateRecipeController'
    })
    .when('/equipment', {
      templateUrl: 'views/equipment.html',
      controller: 'EquipmentController'
    })
    .when('/ingredient', {
      templateUrl: 'views/ingredient.html',
      controller: 'IngredientController'
    })
    .when('/landing', {
      templateUrl: 'views/landing.html',
      controller: 'LandingController'
    })
    .when('/recipes', {
      templateUrl: 'views/all_recipes.html',
      controller: 'AllRecipesController'
    })
    .when('/recipes/:id', {
      templateUrl: 'views/recipes.html',
      controller: 'RecipeController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController'
    })
    .when('/sign_in', {
      templateUrl: 'views/sign_in.html',
      controller: 'SignInController'
    })
    .when('/sign_out', {
      templateUrl: 'views/sign_out.html',
      controller: 'SignOutController'
    })
    .when('/profile', {
      templateUrl: 'views/user.html',
      controller: 'UserController'
    })
    .otherwise({ redirectTo: '/' });
}]);
