'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brewtorial Recipe controller test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
  }));

  it('should test true', function(){
    expect(true).toBe(true);
  });

  it('Should be able to create a new controller', function(){
    var RecipeController = $CtrlrConstructor('RecipeController', {$scope: $scope});
    expect(typeof RecipeController).toBe('object');
    expect(typeof $scope.header).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(Array.isArray($scope.ingredients)).toBe(true);
    expect(Array.isArray($scope.steps)).toBe(true);
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.RecipeController = $CtrlrConstructor('RecipeController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request on index', function() {
      $httpBackend.expectGET('/api/recipe')
        .respond(200,[{ abv: 1, author: 'Test Author', brewTime: 50, style: 'Pilsner', likes: 4, popularity: ['testUser'], difficulty: 5,  icon: 'testUrl', title: 'Test Brew'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.recipes[0].abv).toBe(1);
      expect($scope.recipes[0].author).toBe('Test Author');
      expect($scope.recipes[0].brewTime).toBe(50);
      expect($scope.recipes[0].style).toBe('Pilsner');
    });

    it('should make a post request to brewEvents', function() {
      $httpBackend.expectPOST('/api/brewEvents')
        .respond(200,[{ abv: 1, author: 'Test Author', brewTime: 50, style: 'Pilsner', likes: 4, popularity: ['testUser'], difficulty: 5,  icon: 'testUrl', title: 'Test Brew'}]);
      $httpBackend.flush();
      expect($scope.recipes[0].abv).toBe(1);
      expect($scope.recipes[0].author).toBe('Test Author');
      expect($scope.recipes[0].brewTime).toBe(50);
      expect($scope.recipes[0].style).toBe('Pilsner');
    });
  });

});
