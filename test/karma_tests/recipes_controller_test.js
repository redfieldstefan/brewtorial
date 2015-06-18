'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brewtorial controllers test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('brewApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
  }));

  it('should test true', function(){
    expect(true).toBe(true);
  });

  it('Should be able to create a new controller', function(){
    var allRecipesController = $CtrlrConstructor('allRecipesController', {$scope: $scope});
    expect(typeof allRecipesController).toBe('object');
    expect(typeof $scope.header).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(Array.isArray($scope.recipes)).toBe(true);
    expect(Array.isArray($scope.ingredients)).toBe(true);
    expect(Array.isArray($scope.steps)).toBe(true);
    expect(Array.isArray($scope.equipment)).toBe(true);
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.allRecipesController = $CtrlrConstructor('allRecipesController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

});
