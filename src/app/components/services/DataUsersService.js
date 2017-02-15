/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   31-01-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 09-02-2017
 */
(function() {
  'use strict';
  angular.module('app')
    .service('DataUsersService', ['_', '$q', '$log', '$timeout', '$http', 'HomeService',
      function(_, $q, $log, $timeout, $http, home) {
        var baseUrl = home.protocol + '://' + home.url + ':' + home.port;


        function _paramsUrl(url, queryArray) {
          var pms = queryArray,
            urlParts = url.split('?'),
            pmsC = [];
          if (urlParts.length == 1) {
            urlParts[1] = "";
          }
          if (_.isObject(pms)) {
            for (var k in pms) {
              pmsC.push(k + "=" + pms[k]);
            }
          }
          urlParts[1] += pmsC.join("&");
          url = urlParts.join("?");
          return url;
        }


        function getUsersAll(queryArray) {
          var url = baseUrl + '/data/users/all';

          url = _paramsUrl(url, queryArray);

          return $http.get(url)
            .then(function(resp) {
              var data = resp.data;
              return data;
            });

        }

        function getUsersSex(queryArray) {
          var url = baseUrl + '/data/users/sex';

          url = _paramsUrl(url, queryArray);

          return $http.get(url)
            .then(function(resp) {
              var data = resp.data;
              return data;
            });
        }

        function getUsersEdad(queryArray) {
          queryArray.sex = 2;
          var url = baseUrl + '/data/users/edad';
          url = _paramsUrl(url, queryArray);

          return $http.get(url)
            .then(function(resp) {
              var data = resp.data;
              return data;
            })
        }

        return ({
          getUsersAll: getUsersAll,
          getUsersSex: getUsersSex,
          getUsersEdad: getUsersEdad
        });
      }
    ])
})();
