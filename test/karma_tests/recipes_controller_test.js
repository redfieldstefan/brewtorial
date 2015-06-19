'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brewtorial controllers test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $scope;
  var $location

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, _$location_) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
    $location = _$location_;
  }));

  it('should test true', function(){
    expect(true).toBe(true);
  });

  it('Should be able to create a new controller', function(){
    var AllRecipesController = $CtrlrConstructor('AllRecipesController', {$scope: $scope});
    expect(typeof AllRecipesController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(Array.isArray($scope.recipes)).toBe(true);
    expect($scope.beerTally).toBe(0);
    expect($scope.sortOrder).toBe(false);
    expect($scope.sortBy).toBe('name');
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.AllRecipesController = $CtrlrConstructor('AllRecipesController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    it('should make a getAll request', function() {
      $httpBackend.expectGET('/api/recipe')
        .respond(200, {result: [{_id: 1, header: {title: 'test', style: 'beer'}}]});
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
      expect($scope.beerTally).toBe(1);
      expect($scope.recipes.length).toBe(1);
      expect($scope.recipes[0].header.title).toBe('test');
      expect($scope.recipes[0].header.style).toBe('beer');
    });

    it('should sort by various props', function() {
      $scope.sort('title');
      expect($scope.sortBy).toBe('header.title');
      expect($scope.sortOrder).toBe(true);
    });

    it('should redirect to a recipe page', function() {
      $scope.view({_id: 1, header: {title: 'test', style: 'beer'}});
      expect($location.path()).toBe('/recipes/1');
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

});
