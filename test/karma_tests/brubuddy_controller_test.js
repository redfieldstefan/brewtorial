'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brubuddy controllers test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('bruApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
  }));

  it('Should be able to create a new controller', function(){
    var bruController = new $CtrlrConstructor('bruController', {$scope: $scope});
    expect(typeof bruController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(Array.isArray($scope.recipes)).toBe(true);
    expect(Array.isArray($scope.ingredients)).toBe(true);
    expect(Array.isArray($scope.steps)).toBe(true);
    expect(Array.isArray($scope.equipment)).toBe(true);

  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.bruController = $CtrlrConstructor('bruController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });



  });


});
