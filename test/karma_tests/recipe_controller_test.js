'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brewtorial recipe controller test', function() {
  var $CtrlrConstructor;
  var $httpBackend;
  var $scope;
  var $location;
  var $routeParams;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, _$location_, _$routeParams_) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
    $location = _$location_;
    $routeParams = _$routeParams_;
  }));

  it('should test true', function() {
    expect(true).toBe(true);
  });

  it('Should be able to create a new controller', function(){
    var RecipeController = $CtrlrConstructor('RecipeController', {$scope: $scope});
    expect(typeof RecipeController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.header).toBe('object');
    expect(Array.isArray($scope.ingredients)).toBe(true);
    expect(Array.isArray($scope.equipment)).toBe(true);
    expect(Array.isArray($scope.steps)).toBe(true);
  });

  describe('Function tests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.RecipeController = $CtrlrConstructor('RecipeController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    it('should make a get recipe request', function() {
      $routeParams._id = 1;
      var mockRes = {
        _id: 1,
        header: {title: 'test', style: 'beer'},
        description: 'a test recipe',
        ingredients: [{item: 'hops', amount: 3, unit: 'pounds'}],
        equipment: ['jug', 'bottle'],
        steps: [{directions: 'do the thing', offset: 5, status: false}]
      };

      $httpBackend.expectGET('/api/recipe/1').respond(200, {result: mockRes});
      $scope.getRecipe();
      $httpBackend.flush();
      expect($scope.header.title).toBe('test');
      expect($scope.header.style).toBe('beer');
      expect($scope.ingredients[0].item).toBe('hops');
      expect($scope.ingredients[0].amount).toBe(3);
      expect($scope.ingredients[0].unit).toBe('pounds');
      expect($scope.errors.length).toBe(0);
    });
  });
});
