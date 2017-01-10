/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   03-01-2017
 * @Email:  jumidi@gmail.com
 * @Last modified by:   juanmi
 * @Last modified time: 03-01-2017
 */
(function() {
    'use strict';
    angular.module('app')
        .service('AuthService', ['$q', '$timeout', '$http',
            AuthService
        ]);

    function AuthService($q, $timeout, $http) {

        var user = null;

        return ({
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register
        });

        function isLoggedIn() {
            if (user) {
                return true;
            } else {
                return false;
            }
        }

        function getUserStatus() {
            return $http.get('/user/status')
                .then(function(data) {
                    if (data.status) {
                        user = true;
                    } else {
                        user = false;
                    }
                }, function(data) {
                    user = false;
                });
        }

        function login(user) {
            var deferred = $q.defer();

            $http.post('/user/login', {
                    username: user.username,
                    password: user.password
                })
                .then(function(data, status) {
                        if (status === 200 && data.status) {
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

            $http.get('/user/logout')
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
            $http.post('/user/register', {
                username: user.username,
                password: user.password
            }).then(function(data, status) {
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


    }
})();
