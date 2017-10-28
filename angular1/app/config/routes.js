angular.module('primeiraApp').config([
  '$locationProvider',
  '$stateProvider',
  '$urlRouterProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('')
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('billingCycle', {
      url: "/billingCycles",
      templateUrl: "billingCycle/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
}])
