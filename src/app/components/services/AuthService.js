/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   03-01-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 10-01-2017
 */
(function() {
    'use strict';
    angular.module('app')
      .service('AuthService', ['$q', '$log', '$timeout', '$http', 'HomeService',
      function($q, $log, $timeout, $http, home) {
          var user = null;
          var baseUrl = home.protocol + '://' + home.url + ':' + home.port;
          function isLoggedIn() {
              if (user) {
                  return true;
              } else {
                  return false;
              }
          }

          function getUserStatus() {
              return $http.get(baseUrl + '/user/status')
                  .then(function(resp) {
                    var data = resp.data;
                      if (data.status) {
                          user = true;
                      } else {
                          user = false;
                      }
                  }, function(data) {
                      user = false;
                      //console.log(data);
                  });
          }

          function login(user) {
              var deferred = $q.defer();

              $http.post(baseUrl + '/user/login', {
                      username: user.username,
                      password: user.password
                  })
                  .then(function(resp) {
                          var data = resp.data;
                          var status = resp.status;
                          if (status === 200 && data.status) {
                            $log.info('ok');
                              user = true;
                              deferred.resolve();
                          } else {
                              user = false;
                              deferred.reject();
                          }
                      },
                      function(data) {
                          user = false;
                          deferred.reject();
                      });

              return deferred.promise;
          }

          function logout() {
              var deferred = $q.defer();

              $http.get(baseUrl + '/user/logout')
                  .then(function(data) {
                      user = false;
                      deferred.resolve();
                  }, function(data) {
                      user = false;
                      deferred.reject();
                  });

              return deferred.promise;
          }

          function register(user) {

              // create a new instance of deferred
              var deferred = $q.defer();

              // send a post request to the server
              $http.post(baseUrl + '/user/register', {
                  username: user.username,
                  password: user.password
              }).then(function(resp) {
                      var data = resp.data;
                      var status = resp.status;
                      if (status === 200 && data.status) {
                          deferred.resolve();
                      } else {
                          deferred.reject();
                      }
                  },
                  function(data) {
                      deferred.reject();
                  });

              // return promise object
              return deferred.promise;

          }

          return ({
              isLoggedIn: isLoggedIn,
              getUserStatus: getUserStatus,
              login: login,
              logout: logout,
              register: register
          });

      }
]);
})();
