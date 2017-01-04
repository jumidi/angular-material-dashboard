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
    .controller('RegisterController',[
      '$scope','$log', '$q', '$state', '$mdToast', 'AuthService',
      RegisterController
    ]);

    function RegisterController($scope,$log, $q, $state, $mdToast, AuthService){
      var vm = this;
      vm.title = $state.current.data.title;

      $scope.register = function(){
        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call register from service
        AuthService.register($scope.user)
        // handle success
            .then(function () {
                $scope.disabled = false;
                $scope.registerForm = {};
                $state.go('login')
            })
            // handle error
            .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "Something went wrong!";
                $scope.disabled = false;
                $scope.registerForm = {};
            });

      }

    }
})();
