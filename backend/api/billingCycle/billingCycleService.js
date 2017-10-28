const BillingCycle = require('./billingCycle')
const _ = require ('lodash')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})

BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle // pega o erro do body

  if (bundle.errors) { // se for diferente de undefine, null ou vazio, entre no if
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors}) // manda os erros, ja parseados em array (feito na linha acima, que chama uma função criada para transformar o objeto em array), para serem consumidos no frontend
  }else{
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message)) // pega o erro, e acessa o atributo mensagem. Erro gerado, no erro de persistencia do formulario
  return errors
}

BillingCycle.route('count', function(req, res, next) {
  BillingCycle.count(function(error, value) {
    if(error){
      res.status(500).json({errors: [error]})
    }else{
      res.json({value})
    }
  })
})

module.exports = BillingCycle
