'use strict';

require('../../client/js/client');
require('angular-mocks');

describe('Landing Page controller test', function(){

  var $CtrlrConstructor;
  var $httpBackend;
  var $scope;
  var $location;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, _$location_) {
    $scope = $rootScope.$new();
    $CtrlrConstructor = $controller;
    $location = _$location_;
  }));

  it('Should be able to create a new controller', function(){
    var LandingController = $CtrlrConstructor('LandingController', {$scope: $scope});
    expect(typeof LandingController).toBe('object');
    expect(Array.isArray($scope.errors)).toBe(true);
  });
  describe('REST Functionality', function(){

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      this.LandingController = $CtrlrConstructor('LandingController', {$scope: $scope});
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should post a new tally', function(){
      $httpBackend.expectPOST('/api/service').respond(200, {result: {users: 1, recipes: 1, craftings: 1 }});
      $scope.getLandingTallies();
      $httpBackend.flush();
      expect($scope.tallies.users).toBe(1);
      expect($scope.tallies.recipes).toBe(1);
      expect($scope.tallies.craftings).toBe(1);
    });

  });

});
