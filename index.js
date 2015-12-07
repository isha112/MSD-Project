var app = angular.module('mainApp', ['ui.bootstrap', 'ui.router','ngRoute','checklist-model','ui.validate']);

app.controller('NavController', function ($scope, $http, $modal, $routeParams, $rootScope, $state) {
    
    //login modal 
    $scope.loginm = function () {

        $rootScope.message = null;
        var modalInstance = $modal.open({
            templateUrl: 'projectPages/login/login.html',
            controller: 'LoginController'

        });
    };
    //signup Modal
    $scope.signupm = function () {
        $rootScope.signupMessage = null;
        $modal.open({
            templateUrl: 'projectPages/register/registration.html',
            controller: 'SignupController'

        });
    }

    //logout
    $scope.logout = function () {
        $rootScope.currentUser = null;
        $rootScope.$broadcast('clearData');
        $state.go('home');
    }
});



app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'projectPages/home/home.html',
            controller: 'HomeController'
        })
        .state('profile', {
            url: '/profile/:userid',
            templateUrl: 'projectPages/profile/profile.html',
            controller: 'ProfileController'
        })
});
