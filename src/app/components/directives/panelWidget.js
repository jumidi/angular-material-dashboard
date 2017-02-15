/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   27-01-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 08-02-2017
 */



'use strict';

angular.module('app')
  .directive('panelWidget', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        title: '@',
        template: '@',
        options: '@'
      },
      template: '' +
        '<section layout-margin class="md-whiteframe-z1 panel-widget">' +
        '  <md-toolbar md-theme="custom" class="md-hue-1 panel-widget-toolbar">' +
        '    <div class="md-toolbar-tools">' +
        '      <h3 class="panel-widget-tittle">{{title}}</h3>' +
        '      <span flex></span>' +
        '      <md-button ng-show="options" ng-click="$showOptions = !$showOptions" class="md-icon-button" aria-label="Show options">' +
        '        <i class="material-icons">more_vert</i>' +
        '      </md-button>' +
        '    </div>' +
        '  </md-toolbar>' +
        '  <div ng-include="template"/>' +
        '</section>',
      compile: function(element, attrs, linker) {
        return function(scope, element) {
          linker(scope, function(clone) {
            element.append(clone);
          });
        };
      }
    };
  });
