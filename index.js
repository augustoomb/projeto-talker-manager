const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./routers/talkerRouter'); // ROTAS INICIADAS EM /talker
const loginRouter = require('./routers/loginRouter'); // ROTAS INICIADAS EM /login

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// TUDO O QUE FOR PARA ROTAS INICIADAS EM /talker
app.use('/talker', talkerRouter);

// TUDO O QUE FOR PARA ROTAS INICIADAS EM /login
app.use('/login', loginRouter);

// RODANDO A APLICAÇÃO
app.listen(PORT, () => {
  console.log('Online');
});
