// (function() {
//   angular.module('primeiraApp').controller('BillingCycleCtrl', [
//     '$http',
//     BillingCycleController
//   ])
//
//   function BillingCycleController() {
//     const self = this
//     self.create = function () {
//       const url = 'http://localhost:3003/api/billingCycles'
//       $http.post(url, self.billingCycle).success(function(response) {
//         self.billingCycle = {}
//         console.log('Sucesso!')
//       })
//     }
//   }
//   BillingCycleController()
// })()
