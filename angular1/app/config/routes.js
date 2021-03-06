(function() {
  angular.module('primeiraApp').config([
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {
      $stateProvider.state('dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard.html"
      }).state('billingCycle', {
        url: "/billingCycles?pages",
        templateUrl: "billingCycle/tabs.html"
      })

      $urlRouterProvider.otherwise('/dashboard')
      $locationProvider.hashPrefix('')
  }])
})()
