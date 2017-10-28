const server = require('./config/server')
require('./config/database')
require('./config/routes')(server) // pega express e as configurações do server, e passa como parametro para ser consumido no modulo routes
