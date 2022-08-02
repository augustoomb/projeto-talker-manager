const express = require('express');
const bodyParser = require('body-parser');
const loginValidator = require('./loginValidator');

const { validateEmail, validatePassword } = loginValidator;

const router = express.Router();
router.use(bodyParser.json());

router.post('/', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;
  return res.status(200).json({
    email,
    password,
  });
});

module.exports = router;