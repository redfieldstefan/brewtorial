'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brewtorial brew event controllers test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
  }));

  it('Should be able to create a new controller', function(){
    var BrewController = $CtrlrConstructor('BrewController', {$scope: $scope});
    expect(typeof BrewController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.BrewController = $CtrlrConstructor('BrewController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

});
