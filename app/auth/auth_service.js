"use strict";

module.exports = function(app) {
  app.factory('auth', ['$http', '$base64', '$cookies', function($http, $base64, $cookies) {
    return {
      signIn: function(user, callback) {
        //make an encoded version of username and password
        var encoded = $base64.encode(user.email + ':' + user.password);
        $http.get('/api/users/sign_in', {
          //following is what http-basic expects
          headers: {'Authorization': 'Basic ' + encoded}
        })
        .success(function(data){
          $cookies.put('eat', data.token);
          callback(null);
        })
        .error(function(data) {
          callback(data);
        });
      },

      create: function(user, callback) {
        $http.post('/api/users/create_user', user)
          .success(function(data) {
            console.log(data);
            $cookies.put('eat', data.token);
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      },

      logout: function() {
        $cookies.put('eat', '');
      },

      //helper method to tell if user is signed in
      isSignedIn: function() {
        return !!($cookies.get('eat') && $cookies.get('eat').length);
      }
    };
  }]);
};
