const utils = require('../utils/utils');

const { emailIsValid } = utils;

function validateEmail(req, res, next) {
  const { email } = req.body;

  try {
    if (!email) {
      throw new Error('O campo "email" é obrigatório');
    }

    if (!emailIsValid(email)) {
      throw new Error('O "email" deve ter o formato "email@email.com"');
    }    
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  try {
    if (!password) {
      throw new Error('O campo "password" é obrigatório');
    }

    if (password.length < 6) {
      throw new Error('O "password" deve ter pelo menos 6 caracteres');
    }    
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
}

module.exports = {
  validateEmail,
  validatePassword,
};