/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   03-01-2017
 * @Email:  jumidi@gmail.com
 * @Last modified by:   juanmi
 * @Last modified time: 03-01-2017
 */



(function() {

    angular
        .module('app')
        .controller('LoginController', [
            '$scope', '$log', '$q', '$state', '$mdToast', 'AuthService',
            LoginController
        ]);

    function LoginController($scope, $log, $q, $state, $mdToast, AuthService) {
        var vm = this;
        vm.title = $state.current.data.title;
        $scope.login = function() {
            $scope.error = false;
            $scope.disabled = true;
            AuthService.login($scope.user)
                .then(function() {
                    $state.go('home.dashboard')
                })
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "No login";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });
        }
    }

})();
