const express = require('express');

module.exports = function(server) {

  //Api Routes
  const router = express.Router()
  server.use('/api', router)

  //Rotas da API
  const billingCycleService = require ('../api/billingCycle/billingCycleService')
  billingCycleService.register(router, '/billingCycles')

  const billingSummaryCycle = require ('../api/billingSummary/billingSummaryService')
  router.route('/billingSummary').get(billingSummaryCycle.getSummary)
}
