const { User } = require('../models');

const userDoesntExistError = {
  err: {
    status: 404,
    message: 'User does not exist',
  },
};

const userAlreadyExistsError = {
  err: {
    status: 409,
    message: 'User already registered',
  },
};

const findAll = async () => User.findAll();

const findById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return userDoesntExistError;
  return user;
};

const create = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });
  if (user) return userAlreadyExistsError;
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

module.exports = { findAll, findById, create };