const fs = require('fs').promises;
const crypto = require('crypto');

const file = 'talker.json';

// FUNÇÃO PARA LER ARQUIVOS
async function readFile() {
  const data = await fs.readFile(file, 'utf-8');
  return JSON.parse(data);
}

// BUSCA UM ITEM EM UM ARRAY
function findInArray(arr, id) {
  return arr.find((item) => item.id === Number(id));
}

// REGEX PARA VERIFICAR SE UM E-MAIL É VALIDO
function emailIsValid(email) {
  const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = {
  readFile,
  findInArray,
  emailIsValid,
  generateToken,
};