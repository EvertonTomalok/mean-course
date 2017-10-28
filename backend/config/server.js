const port = 3003

const bodyParser = require('body-parser')
const express    = require('express')
const server     = express()

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

/* Rotas da API, que estão no arquivo api/config/routes, e são invocados no loader, pegando este modulo server (tem express configurado), e passa por parametro, para ser consumido no proprio modulo routes

const router = express.Router()
server.use('/api', router)

//Rotas da API
const billingCycleService = require ('../api/billingCycle/billingCycleService')
billingCycleService.register(router, '/billingCycles')
*/

server.listen(port, function() {
  console.log(`BACKEND rodando na porta ${port}.`);
})

module.exports = server
