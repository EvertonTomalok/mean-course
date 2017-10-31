const mongoose = require('mongoose')

const DbURL = 'mongodb://localhost/db_finance'

module.exports = mongoose.connect(DbURL)

//config monitoramento
mongoose.connection.on('connected', function () {
  console.log(`Mongoose rodando em: ${DbURL}`);
})

mongoose.connection.on('error', function (err) {
  console.log(`Mongoose erro: `, err);
})

mongoose.connection.on('disconnected', function () {
  console.log(`Mongoose desconectado de: ${DbURL}`);
})

mongoose.connection.on('open', function () {
  console.log(`Mongoose conexão aberta`);
})

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(`Mongoose desconectado de: ${DbURL}`);
    process.exit(0)
  })
})
// fim config monitoramento


mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O valor '{VALUE}' informado é menor que o limite minimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O valor '{VALUE}' informado é maior que o limite maximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para '{PATH}'."
