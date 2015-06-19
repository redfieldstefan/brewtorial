'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('user controller', function() {
  var $cConstr;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('brewtorialApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $cConstr = $controller;
  }));

  it('should test true', function(){
    expect(true).toBe(true);
  });

  // it('should be able to get all users')

});
