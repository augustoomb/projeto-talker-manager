const fs = require('fs').promises;
const crypto = require('crypto');

const file = 'talker.json';

// FUNÇÃO PARA LER ARQUIVOS
async function readFile() {
  const data = await fs.readFile(file, 'utf-8');
  return JSON.parse(data);
}

async function writeFile(arr) {
  await fs.writeFile(file, JSON.stringify(arr));
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

function validateDate(d) {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!dateRegex.test(d)) {
    return false;
  }

  return true;
}

module.exports = {
  readFile,
  findInArray,
  emailIsValid,
  generateToken,
  validateDate,
  writeFile,
};