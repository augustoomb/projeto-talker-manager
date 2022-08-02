const fs = require('fs').promises;

const file = 'talker.json';

// FUNÇÃO PARA LER ARQUIVOS
async function readFile() {
  const data = await fs.readFile(file, 'utf-8');
  return JSON.parse(data);
}

module.exports = {
  readFile,
};