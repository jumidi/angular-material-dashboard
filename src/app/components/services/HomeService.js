/**
* @Author: Juan Miguel Diago <juanmi>
* @Date:   10-01-2017
* @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 10-01-2017
*/
(function(){
  'use strict';
  angular.module('app')
    .service('HomeService', [function(){
      return {
        protocol : 'http',
        url : 'ubdashboard.dev',
        port: 3340,
      }
    }])
})();
