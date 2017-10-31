(function(){
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'msgs',
        BillingCycleController
    ])
    function BillingCycleController($http, msgs) {
        const vm = this
        const url = `http://localhost:3003/api/billingCycles`
        
        vm.create = function() {
          console.log('1');

            $http.post(url, vm.billingCycle).then(function(response){
                vm.billingCycle = {}
                msgs.addSuccess('sucesso!')
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
                })
        }
    }
})()
