const { User } = require('../models');

module.exports = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user || user.password !== password) {
    return { err: { status: 400, message: 'Invalid fields' } };
  }
  return user;
};