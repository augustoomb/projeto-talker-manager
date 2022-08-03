const fs = require('fs').promises;
const crypto = require('crypto');

const file = './talker.json';

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

// BUSCA UM NOME OU PARTE DELE NO ARRAY
function findPartsNameInArray(arr, partName) {
  return arr.filter((item) => item.name.includes(partName));
}

// DEVOLVE O ARR SEM O ELEMENTO COM O id INFORMADO
function filterArray(arr, id) {
  return arr.filter((item) => item.id !== Number(id));
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

function generateNextId(arrPeople) {
  const ids = arrPeople.map((person) => person.id); // gera um arr com os ids presentes no arquivo
  const highestId = Math.max.apply(null, ids); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/max
  return highestId + 1; // na linha de cima descobre qual o maior id e aqui adiciona 1
}

module.exports = {
  readFile,
  findInArray,
  emailIsValid,
  generateToken,
  validateDate,
  writeFile,
  generateNextId,
  filterArray,
  findPartsNameInArray,
};