const { User } = require('../models');
const { userAlreadyExistsError } = require('../utils/validations');

const create = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });
  if (user) return userAlreadyExistsError;
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

module.exports = { create };