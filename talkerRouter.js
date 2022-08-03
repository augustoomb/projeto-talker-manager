const express = require('express');
const utils = require('./utils');
const talkerValidator = require('./talkerValidator');

const router = express.Router();
const { readFile, findInArray, writeFile, generateNextId } = utils;
const { validateToken, validateName, validateAge, validateTalk } = talkerValidator;

router.get('/', async (_req, res) => {
  try {
    const arrPeople = await readFile();
    return res.status(200).json(arrPeople);
  } catch (error) {
    return res.status(500).json(`Ocorreu um erro: ${error.message}`);
  }  
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const arrPeople = await readFile();
    const personFound = await findInArray(arrPeople, id);
    if (personFound) {
      return res.status(200).json(personFound);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return res.status(500).json(`Ocorreu um erro: ${error.message}`);
  }  
});

router.post('/', validateToken, validateName, validateAge, validateTalk, async (req, res) => {
  const { name, age, talk } = req.body;

    try {
      const arrPeople = await readFile();
      const id = generateNextId(arrPeople);
      arrPeople.push({ name, age, id, talk });
      await writeFile(arrPeople);
      return res.status(201).json({ id, name, age, talk });
    } catch (error) {
      return res.status(500).json(`Ocorreu um erro: ${error.message}`);
    }
});

module.exports = router;
