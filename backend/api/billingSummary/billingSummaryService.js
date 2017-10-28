const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')


// Mais uma função middleware
function getSummary(req, res) {
  BillingCycle.aggregate({
    $project: {credit: {$sum: "$credits.value"}, debt: {$sum:"$debts.value"}}
  },{
    $group: {_id: null, credit:{$sum:"$credit"}, debt: {$sum: "$debt"}}
  }, {
    $project: {_id: 0, credit: 1, debt: 1}
  }, function(error, result) {
    if(error){
    res.status(500).json({errors: [error]})
  }else{
    res.json(_.defaults(result[0], {credit: 0, debt: 0})) // O lodash ira definir valores inicias e caso os próximo atributos do objeto não possuirem os atributos creditos e debitos, será atribuido o valor 0 para credito e debito
    }
  })
}

module.exports = { getSummary }
