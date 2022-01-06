require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersService = require('../services/UsersService');
const { validateUser } = require('../utils/validations');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1h' };

const create = async (req, res, next) => {
  const entriesValidation = validateUser(req.body);
  if (entriesValidation.err) return next(entriesValidation.err);
  const user = await UsersService.create(req.body);
  if (user.err) return next(user.err);
  const payload = { email: req.body.email };
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(201).json({ token });
};

module.exports = { create };