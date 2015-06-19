'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brewtorial create recipe controllers test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
  }));

  it('Should be able to create a new controller', function(){
    var CreateRecipeController = $CtrlrConstructor('CreateRecipeController', {$scope: $scope});
    expect(typeof CreateRecipeController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(Array.isArray($scope.ingredients)).toBe(true);
    expect(Array.isArray($scope.steps)).toBe(true);
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.CreateRecipeController = $CtrlrConstructor('CreateRecipeController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a new recipe', function(){
      $httpBackend.expectPOST('/api/recipe').respond(200, {result: {_id: 2}, equipment: ['TEST'], ingredients: ['TEST'], steps: ['TEST'], description: "Oh what a test" });
      $scope.createRecipe();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
    });

    it('should get a list of equipment', function(){
      $httpBackend.expectGET('/api/equipment').respond(200, {result: ['cool hammer']});
      $scope.getEquipmentList();
      $httpBackend.flush();
      expect($scope.availableEquipment[0]).toBe('cool hammer');
    });

  });

});
