require('dotenv').config();
const jwt = require('jsonwebtoken');
const loginService = require('../services/LoginService');
const { validateLogin } = require('../utils/validations');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1h' };

module.exports = async (req, res, next) => {
  const entriesValidation = validateLogin(req.body);
  if (entriesValidation.err) return next(entriesValidation.err);
  const user = await loginService(req.body);
  if (user.err) return next(user.err);
  const payload = { email: req.body.email };
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(200).json({ token });
};