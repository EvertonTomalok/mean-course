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
        self.billingCycle = {credits:[{}], debts:[{}]}
        self.billingCycles = response
        tabs.show(self, { tabList: true, tabCreate: true}) // self sera o owner do método show TabDelete e Update recebem falso por padrao, e nao aparecem no ng-if
      })
    }

    self.create = function() {
      $http.post(url, self.billingCycle).then(function(response){
        self.refresh()
        msgs.addSuccess(`Operação realizada com sucesso!` )
      }).catch(function(resp) {
        msgs.addError(resp.data.errors)
      })
    }

    self.showTabUpdate = function(billingCycle) {
      self.billingCycle = billingCycle
      tabs.show(self, {tabUpdate: true})
    }

    self.showTabDelete = function (billingCycle) {
      self.billingCycle = billingCycle
      tabs.show(self, {tabDelete: true})
    }

    self.delete = function(billingCycle) {
      $http.delete(`${url}/${billingCycle._id}`, self.billingCycle).then(function(response) {
        msgs.addSuccess(`Excluido com sucesso!`)
      }).catch(function(resp) {
        msgs.addError(resp.data.errors)
      })
    }

    self.update = function (billingCycle) {
      self.billingCycle = billingCycle
      $http.put(`${url}/${billingCycle._id}`, self.billingCycle).then(function() {
        self.refresh()
      }).then(function() { // posso colocar um then atras do outro, quando for sucesso
        msgs.addSuccess(`Alterado com sucesso!`)
      }).catch(function(resp) {
        msgs.addError(resp.data.errors)
      })
    }

    self.refresh()
  }
})()
