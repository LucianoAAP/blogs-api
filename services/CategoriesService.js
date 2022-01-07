const { Category } = require('../models');

const categoryAlreadyExistsError = {
  err: {
    status: 409,
    message: 'Category already registered',
  },
};

const findAll = async () => Category.findAll();

const create = async ({ name }) => {
  const category = await Category.findOne({ where: { name } });
  if (category) return categoryAlreadyExistsError;
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = { findAll, create };