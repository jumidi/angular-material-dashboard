/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   27-01-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 11-02-2017
 */



(function() {

  angular
    .module('app')
    .controller('MainController', [
      '$scope', '$rootScope', '_',
      'navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast', '$mdDateRangePicker',
      MainController
    ]);

  function MainController($scope, $rootScope, _, navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast, $mdDateRangePicker) {
    var vm = this;

    vm.menuItems = [];
    vm.selectItem = selectItem;
    vm.toggleItemsList = toggleItemsList;
    vm.showActions = showActions;
    vm.title = $state.current.data.title;
    vm.showSimpleToast = showSimpleToast;
    vm.toggleRightSidebar = toggleRightSidebar;
    vm.dend = new Date(2012, 5, 21);
    vm.dstart = null;

    if (!_.isUndefined($rootScope.selectedRange)) {
      vm.dend = $rootScope.selectedRange.dateEnd;
      vm.dstart = $rootScope.selectedRange.dateStart;
    } else {
      vm.dstart = new Date(vm.dend.getTime() - 31 * 24 * 60 * 60 * 1000);
    }

    $rootScope.selectedRange = {
      selectedTemplate: 'TW',
      selectedTemplateName: 'This Week',
      dateStart: vm.dstart,
      dateEnd: vm.dend,
      showTemplate: false,
      fullscreen: false
    };
    $scope.pick = function($event, showTemplate) {
      $rootScope.selectedRange.showTemplate = showTemplate;
      $mdDateRangePicker.show({
        targetEvent: $event,
        model: $rootScope.selectedRange
      }).then(function(result) {
        if (result)
          $rootScope.selectedRange = result;
        $rootScope.ubRange = {
          dateStart: result.dateStart,
          dateEnd: result.dateEnd
        }
      });
    };

    $scope.refreshDates = function() {
      $rootScope.ubRange = {
        dateStart: $rootScope.selectedRange.dateStart,
        dateEnd: $rootScope.selectedRange.dateEnd
      }
      console.log('pulsado!!!!', $rootScope.ubRange);
    }

    if (_.isUndefined($rootScope.ubRange)) {
      $rootScope.ubRange = {
        dateStart: $rootScope.selectedRange.dateStart,
        dateEnd: $rootScope.selectedRange.dateEnd
      }
    }




    navService
      .loadAllItems()
      .then(function(menuItems) {
        vm.menuItems = [].concat(menuItems);
      });

    function toggleRightSidebar() {
      $mdSidenav('right').toggle();
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function() {
        $mdSidenav('left').toggle();
      });
    }

    function selectItem(item) {
      vm.title = item.name;
      vm.toggleItemsList();
      vm.showSimpleToast(vm.title);
    }

    function showActions($event) {
      $mdBottomSheet.show({
        parent: angular.element(document.getElementById('content')),
        templateUrl: 'app/views/partials/bottomSheet.html',
        controller: ['$mdBottomSheet', SheetController],
        controllerAs: "vm",
        bindToController: true,
        targetEvent: $event
      }).then(function(clickedItem) {
        clickedItem && $log.debug(clickedItem.name + ' clicked!');
      });

      function SheetController($mdBottomSheet) {
        var vm = this;

        vm.actions = [{
          name: 'Share',
          icon: 'share',
          url: 'https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc'
        },
          {
            name: 'Star',
            icon: 'star',
            url: 'https://github.com/flatlogic/angular-material-dashboard/stargazers'
          }
        ];

        vm.performAction = function(action) {
          $mdBottomSheet.hide(action);
        };
      }
    }

    function showSimpleToast(title) {
      $mdToast.show(
        $mdToast.simple()
          .content(title)
          .hideDelay(2000)
          .position('bottom right')
      );
    }
  }

})();
