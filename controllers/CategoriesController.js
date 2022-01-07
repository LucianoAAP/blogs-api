const CategoriesService = require('../services/CategoriesService');
const { validateCategory } = require('../utils/validations');

const findAll = async (_req, res) => {
  const category = await CategoriesService.findAll();
  return res.status(200).json(category);
};

const create = async (req, res, next) => {
  const entriesValidation = validateCategory(req.body);
  if (entriesValidation.err) return next(entriesValidation.err);
  const category = await CategoriesService.create(req.body);
  if (category.err) return next(category.err);
  return res.status(201).json(category);
};

module.exports = { findAll, create };