'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brewtorial dashboard controller test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $routeParams;
  var $scope;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
  }));

  it('Should be able to create a new controller', function(){
    var DashboardController = $CtrlrConstructor('DashboardController', {$scope: $scope});
    expect(typeof DashboardController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_, _$routeParams_) {
      this.DashboardController = $CtrlrConstructor('DashboardController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
      $routeParams = _$routeParams_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get a list of recipes', function(){
      $httpBackend.expectGET('/api/recipe').respond(200, {result: ['Test recipes']});
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.recipes[0]).toBe('Test recipes');
    });

  });

});
