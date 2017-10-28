(function() { // chamar uma function, para o dizer que os atributos são somentes desse método, e para chama-lo, é preciso usar o diz, chamando por self, e ao chamar no html, passar o alias, para assumir valor do this
  angular.module('primeiraApp').controller('DashboardCtrl', [
    '$http',
    DashboardController
  ])

  function DashboardController($http) {
    const self = this
    self.getSummary = function() {
      const url = `http://localhost:3003/api/billingSummary`;
      $http.get(url).then(function(response) {
        const {credit = 0, debt = 0} = response.data
        self.credit = credit
        self.debt = debt
        self.total = credit - debt
      })
    }

    self.getSummary()
  }
})()
