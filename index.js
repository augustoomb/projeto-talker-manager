const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// TUDO O QUE FOR PARA ROTAS INICIADAS EM /talker
const talkerRouter = require('./talkerRouter');

// TUDO O QUE FOR PARA ROTAS INICIADAS EM /talker
app.use('/talker', talkerRouter);

// RODANDO A APLICAÇÃO
app.listen(PORT, () => {
  console.log('Online');
});
