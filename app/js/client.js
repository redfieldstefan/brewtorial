"use strict";

require("angular/angular");

var brewApp = angular.module("brewApp", ["ngRoute"]);

//services

//controllers
require("./controllers/all_recipes_controller")(brewApp);
require("./controllers/profile_controller")(brewApp);

//directives
require("./directives/all_recipes_directive")(brewApp);
require("./directives/profile_directive")(brewApp);

brewApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when("/all_recipes", {
      templateUrl: "/js/views/all_recipes.html",
      controller: "allRecipesController"
    })
    .when("/profile", {
      templateUrl: "/js/views/profile.html"
    })
    .when("/", {
      redirectTo: "/all_recipes"
    })
    .otherwise({
      redirectTo: "/create_user"
    });
}]);
