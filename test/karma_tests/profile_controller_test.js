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
  })

  it('Should be able to create a new controller', function(){
    var profileController = $CtrlrConstructor('profileController', {$scope: $scope}); //jshint ignore: line
    expect(typeof profileController).toBe('object');
  });

  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.profileController = $CtrlrConstructor('profileController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

});
