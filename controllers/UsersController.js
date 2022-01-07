require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersService = require('../services/UsersService');
const { validateUser } = require('../utils/validations');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1h' };

const findAll = async (req, res) => {
  const users = await UsersService.findAll();
  return res.status(200).json(users);
};

const findById = async (req, res, next) => {
  const user = await UsersService.findById(req.params.id);
  if (user.err) return next(user.err);
  return res.status(200).json(user);
};

const create = async (req, res, next) => {
  const entriesValidation = validateUser(req.body);
  if (entriesValidation.err) return next(entriesValidation.err);
  const user = await UsersService.create(req.body);
  if (user.err) return next(user.err);
  const payload = { email: req.body.email };
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(201).json({ token });
};

const remove = async (req, res) => {
  const user = await UsersService.remove(req.user.id);
  return res.status(204).json(user);
};

module.exports = { findAll, findById, create, remove };