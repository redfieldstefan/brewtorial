'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('brewtorial user controller test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $routeParams;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
  }));

  it('Should be able to create a new controller', function(){
    var UserController = $CtrlrConstructor('UserController', {$scope: $scope});
    expect(typeof UserController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_, _$routeParams_) {
      this.UserController = $CtrlrConstructor('UserController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
      $routeParams = _$routeParams_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

});
