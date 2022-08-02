const express = require('express');
const bodyParser = require('body-parser');
const loginValidator = require('./loginValidator');
const utils = require('./utils');

const { validateEmail, validatePassword } = loginValidator;
const { generateToken } = utils;

const router = express.Router();
router.use(bodyParser.json());

router.post('/', validateEmail, validatePassword,
(_req, res) => res.status(200).json({ token: generateToken() }));

module.exports = router;