/**
* @Author: Juan Miguel Diago <juanmi>
* @Date:   03-01-2017
* @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 03-01-2017
*/
/**
* @Author: Juan Miguel Diago <juanmi>
* @Date:   03-01-2017
* @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 03-01-2017
*/



(function(){

  angular
    .module('app')
    .controller('LogoutController',[
      '$scope','$log', '$q', '$state', '$mdToast', 'AuthService',
      LogoutController
    ]);

    function LogoutController($scope, $log, $q, $state, $mdToast, AuthService) {
      var vm = this;
      vm.title = $state.current.data.title;
      $scope.logout = function() {
        AuthService.logout()
          .then(function(){
            $state.go('login')
          });
      }
    }

})();
