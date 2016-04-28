'use strict';

require('../../client/js/client');
require('angular-mocks');

describe('brewtorial brew event controllers test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $routeParams = {};
  var $scope;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
    $routeParams.id = 4;
  }));

  it('Should be able to create a new controller', function(){
    var BrewController = $CtrlrConstructor('BrewController', {$scope: $scope});
    expect(typeof BrewController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_, _$routeParams_) {
      $httpBackend = _$httpBackend_;
      $routeParams = _$routeParams_;
      $routeParams.id = 4;
      this.BrewController = $CtrlrConstructor('BrewController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('get a specific brew event', function(){
      $httpBackend.expectGET('/api/brew/4').respond(200, {data: {ingredients: ['Test Ingredients'], steps: ['Test Steps']}});
      $scope.getBrew();
      $httpBackend.flush();
      expect(typeof $scope.thisBrew).toBe('object');
      expect($scope.thisBrew.ingredients[0]).toBe('Test Ingredients');
      expect($scope.steps[0]).toBe('Test Steps');

    });

    it('get save brew event', function(){
      $scope.thisBrew = {
        _id: 4
      };
      $httpBackend.expectPUT('/api/brew/4').respond(200);
      $scope.saveBrew();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(0);
    });

  });

});
