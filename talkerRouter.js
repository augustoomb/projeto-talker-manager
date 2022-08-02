const express = require('express');

const router = express.Router();

const utils = require('./utils');

const { readFile } = utils;

router.get('/', async (_req, res) => {
  try {
    const arrPeople = await readFile();
    res.status(200).json(arrPeople);
  } catch (error) {
    res.status(500).json(`Ocorreu um erro: ${error.message}`);
  }  
});

module.exports = router;