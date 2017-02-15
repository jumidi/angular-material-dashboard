/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   27-01-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 09-02-2017
 */



(function() {
  'use strict';

  angular.module('app')
    .service('navService', [
      '$q',
      navService
    ]);

  function navService($q) {
    var menuItems = [{
      name: 'Usuarios',
      icon: 'people',
      sref: '.users'
    },
      {
        name: 'Juegos',
        icon: 'grade',
        sref: '.users'
      },
      {
        name: 'Ventas',
        icon: 'euro_symbol',
        sref: '.users'
      },
      {
        name: 'Profile',
        icon: 'person',
        sref: '.profile'
      },
      {
        name: 'Table',
        icon: 'view_module',
        sref: '.table'
      }
    ];

    return {
      loadAllItems: function() {
        return $q.when(menuItems);
      }
    };
  }

})();
