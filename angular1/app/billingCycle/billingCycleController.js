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
        self.refresh()
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

    self.addCredit = function(index) {
      self.billingCycle.credits.splice(index + 1, 0, {})
    }

    self.cloneCredit = function(index, name, value){
      self.billingCycle.credits.splice(index + 1, 0, {name, value})
    }

    self.deleteCredit = function(index) {
      if (self.billingCycle.credits.length > 1){
        self.billingCycle.credits.splice(index, 1)
      }
    }

    self.addDebt = function (index) {
      self.billingCycle.debts.splice(index + 1, 0, {})
    }

    self.cloneDebt = function (index, name, value, status) {
      self.billingCycle.debts.splice(index + 1, 0 , {name, value, status})
    }

    self.deleteDebt = function (index) {
      if (self.billingCycle.debts.length > 1){
        self.billingCycle.debts.splice(index, 1)
      }
    }

    self.refresh()
  }
})()
