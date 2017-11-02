(function(){
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
      '$http',
      '$location',
      'msgs',
      'tabs',
      BillingCycleController
  ])
  function BillingCycleController($http, $location, msgs, tabs) {
    const self = this
    const url = `http://localhost:3003/api/billingCycles`

    self.refresh = function() {
      const page = parseInt($location.search().page) || 1

      $http.get(`${url}?skip=${(page - 1) * 10}&limit=12`).then(function(response) {
        self.billingCycle = {credits:[{}], debts:[{}]}
        self.billingCycles = response
        self.calculateValues()
        tabs.show(self, { tabList: true, tabCreate: true}) // self sera o owner do método show TabDelete e Update recebem falso por padrao, e nao aparecem no ng-if

        $http.get(`${url}/count`).then(function(response) {
          self.pages = Math.ceil(response.data.value/12)

        })
      }).catch(function(resp) {
        msgs.addError(resp.data.errors)
      })
    }

    self.create = function() {
      $http.post(url, self.billingCycle).then(function(response){
        self.refresh()
        self.calculateValues()
        msgs.addSuccess(`Operação realizada com sucesso!` )
      }).catch(function(resp) {
        msgs.addError(resp.data.errors)
      })
    }

    self.showTabUpdate = function(billingCycle) {
      self.billingCycle = billingCycle
      self.calculateValues()
      tabs.show(self, {tabUpdate: true})
    }

    self.showTabDelete = function (billingCycle) {
      self.billingCycle = billingCycle
      self.calculateValues()
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
      self.calculateValues()
    }

    self.deleteCredit = function(index) {
      if (self.billingCycle.credits.length > 1){
        self.billingCycle.credits.splice(index, 1)
        self.calculateValues()
      }
    }

    self.addDebt = function (index) {
      self.billingCycle.debts.splice(index + 1, 0, {})
    }

    self.cloneDebt = function (index, name, value, status) {
      self.billingCycle.debts.splice(index + 1, 0 , {name, value, status})
      self.calculateValues()
    }

    self.deleteDebt = function (index) {
      if (self.billingCycle.debts.length > 1){
        self.billingCycle.debts.splice(index, 1)
        self.calculateValues()
      }
    }

    self.calculateValues = function () {
      self.credit = 0
      self.debt = 0
      self.total = 0

      if(self.billingCycle){
        self.billingCycle.credits.forEach(function({value}){
          self.credit += !value || isNaN(value) ? 0 : parseFloat(value)
        })

        self.billingCycle.debts.forEach(function({value}){
          self.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })

        self.total = self.credit - self.debt

      }
    }


    self.refresh()
  }
})()
