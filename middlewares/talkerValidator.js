const utils = require('../utils/utils');

const { validateDate } = utils;

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Error('Token não encontrado');
    }

    if (authorization.length !== 16 || typeof authorization !== 'string') {
      throw new Error('Token inválido');
    }    
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }

  next();
}

function validateName(req, res, next) {
  const { name } = req.body;

  try {
    if (!name) {
      throw new Error('O campo "name" é obrigatório');
    }

    if (name.length < 3) {
      throw new Error('O "name" deve ter pelo menos 3 caracteres');
    }    
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  try {
    if (!age) {
      throw new Error('O campo "age" é obrigatório');
    }

    if (Number(age) < 18 || !Number.isInteger(age)) {
      throw new Error('A pessoa palestrante deve ser maior de idade');
    }    
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
}

// USO INTERNO
const checkTalk = (talk) => {
  if (!talk) {
    throw new Error('O campo "talk" é obrigatório');
  }
};

// USO INTERNO
const checkWatchedAt = (talk) => {
  if (!talk.watchedAt) {
    throw new Error('O campo "watchedAt" é obrigatório');
  }
  if (!validateDate(talk.watchedAt)) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

// USO INTERNO
const checkRate = (talk) => {
  if (talk.rate === undefined) {
    throw new Error('O campo "rate" é obrigatório');
  }
  if (!Number.isInteger(talk.rate) || Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

function validateTalk(req, res, next) {
  const { talk } = req.body;

  try {
    checkTalk(talk);
    checkWatchedAt(talk);
    checkRate(talk);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
}

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
};