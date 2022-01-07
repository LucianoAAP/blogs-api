const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, Category, PostCategories } = require('../models');

const categoryIdsNotFoundError = {
  err: { status: 400, message: '"categoryIds" not found' },
};

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'test' ? config.test : config.development,
);

const create = async ({ title, content, userId, categoryIds }) => {
  const categories = await Category.findAll();
  const categoriesValidation = categoryIds.map((categoryId) => (
    categories.some((category) => category.id === categoryId))).every((valid) => valid === true);
  if (!categoriesValidation) return categoryIdsNotFoundError;
  const t = await sequelize.transaction();
  try {
    const post = await BlogPost
      .create({ title, content, userId, published: new Date(), updated: new Date() },
      { transaction: t });
    const postsCategories = categoryIds.map(async (categoryId) => (PostCategories
      .create({ postId: post.id, categoryId }, { transaction: t })));
    Promise.all(postsCategories);
    await t.commit();
    return post;
  } catch (e) {
    await t.rollback();
    return { err: { message: e.message } };
  }
};

module.exports = { create };