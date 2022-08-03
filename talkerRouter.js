const express = require('express');

const router = express.Router();

const utils = require('./utils');

const { readFile, findInArray, writeFile } = utils;

const talkerValidator = require('./talkerValidator');

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

  const teste = Math.floor(Math.random() * 100) + 5;

    try {
      const arrPeople = await readFile();
      arrPeople.push({ name, age, id: teste, talk });
      await writeFile(arrPeople);
      return res.status(201).json({ id: teste, name, age, talk });
    } catch (error) {
      return res.status(500).json(`Ocorreu um erro: ${error.message}`);
    }
});

module.exports = router;
