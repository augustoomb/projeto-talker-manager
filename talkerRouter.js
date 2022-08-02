const express = require('express');

const router = express.Router();

const utils = require('./utils');

const { readFile, findInArray } = utils;

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

module.exports = router;