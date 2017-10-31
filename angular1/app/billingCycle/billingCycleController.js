(function(){
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
      '$http',
      'msgs',
      'tabs',
      BillingCycleController
  ])
  function BillingCycleController($http, msgs, tabs) {
    const self = this
    const url = `http://localhost:3003/api/billingCycles`

    self.refresh = function() {
      $http.get(url).then(function(response) {
        self.billingCycle = {}
        self.billingCycles = response
        tabs.show(self, { tabList: true, tabCreate: true}) // self sera o owner do método show TabDelete e Update recebem falso por padrao, e nao aparecem no ng-if
      })
    }

    self.create = function() {
      $http.post(url, self.billingCycle).then(function(response){
        msgs.addSuccess(`Operação realizada com sucesso!` )
        self.refresh()
      }).catch(function(resp) {
        msgs.addError(resp.data.errors)
      })
    }
    self.refresh()
  }
})()
