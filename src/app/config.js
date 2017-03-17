/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   16-02-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 17-03-2017
 */

//import angular from 'angular';
angular.module('config', [])
  .constant('ENV', {
    'name': 'devel',
    'api': {
      'endpoint': 'http://data.unobrain.com',
      'token': 'miprodtoken'
    }
  });
