/**
* @Author: Juan Miguel Diago <juanmi>
* @Date:   03-01-2017
* @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 03-01-2017
*/



'use strict';

angular.module('ubdashboardAdmin', ['ngAnimate', 'ngCookies',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'ubdashboard'])

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        data : {
          title: 'Login'
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/views/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        data: {
          title: 'Register'
        }
      })
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        data: {
          title: 'Dashboard'
        }
      })
      .state('home.profile', {
        url: '/profile',
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        }
      })
      .state('home.table', {
        url: '/table',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/views/table.html',
        data: {
          title: 'Table'
        }
      });

    $urlRouterProvider.otherwise('/login');

    $mdThemingProvider
      .theme('default')
        .primaryPalette('blue', {
          'default': '600'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753'
    });

    $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
  });
