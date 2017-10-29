// (function() {
//   angular.module('primeiraApp').controller('BillingCycleCtrl', [
//     '$http',
//     BillingCycleController
//   ])
//   const self = this
//   const url = `http://localhost:3003/api/billingCycles`
//
//   // function BillingCycleController() {
//   //
//   //   self.create = function () {
//   //     const url = 'http://localhost:3003/api/billingCycles'
//   //     $http.post(url, self.billingCycle).success(function(response) {
//   //       self.billingCycle = {}
//   //       console.log('Sucesso!')
//   //     })
//   //   }
//   // }
//
//   function BillingCycleController($http) {
//     self.create = function() {
//       $http.post(url, self.billingCycle).then(function(response) {
//         console.log("Sucesso!");
//       })
//     }
//   }
//
//   BillingCycleController()
// })()
angular.module('primeiraApp').controller('BillingCycleCtrl', [
  '$scope',
  '$http',
  BillingCycleController
])
  function BillingCycleController($scope, $http){

  $scope.create = function() {
    const url = `http://localhost:3003/api/billingCycles`;
    $http.post(url, $scope.billingCycle).then(function(response) {
      $scope.billingCycle = {}
      console.log('Operação realizada com sucesso!!')
    }).catch(function(resp) {
      console.log(resp.data.errors)
    })
    }
  }
