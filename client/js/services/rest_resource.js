'use strict';

module.exports = function(app) {

  var handleError = function(callback) {
    return function(data) {
      console.log(data);
      callback(data);
    };
  };

  var handleSuccess = function(callback) {
    return function(data){
      callback(null, data);
    };
  };

  app.factory('RESTResource', ['$http', '$cookies', function($http, $cookies) {
    return function(resourceName) {
      var eat = $cookies.get('eat');
      $http.defaults.headers.common['eat'] = eat; //jshint ignore: line
      return {

        getOne: function(id, callback) {
          $http.get('/api/' + resourceName + '/' + id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        getAll: function(callback) {
          $http.get('/api/' + resourceName)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        create:  function(resourceData, callback) {
          $http.post('/api/' + resourceName, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        save: function(id, resourceData, callback) {
          $http.put('/api/' + resourceName + '/' + id, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        remove: function(id, callback) {
          $http.delete('/api/' + resourceName + '/' + id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        }
      };
    };
  }]);
};
