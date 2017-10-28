(function() {
  angular.module('primeiraApp').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.hashPrefix('');
      $stateProvider.state('dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard.html"
      }).state('billingCycle', {
        url: "/billingCycles?page",
        templateUrl: "billingCycle/tabs.html"
      })

      $urlRouterProvider.otherwise('/dashboard')
  }])
})()
