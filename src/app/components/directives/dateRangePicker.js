/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   07-02-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 07-02-2017
 */
'use strict'

angular.module('app')
  .directive('dateRangePicker', function() {
    return {
      restrict: 'E',
      scope: {
        dstart: '@',
        dend: '@'
      },
      template: '',
      link: function(scope, element, attrs) {}
    };
  });
