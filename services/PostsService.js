const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, Category, PostCategory, User } = require('../models');

const categoryIdsNotFoundError = {
  err: { status: 400, message: '"categoryIds" not found' },
};

const postDoesntExistError = {
  err: {
    status: 404,
    message: 'Post does not exist',
  },
};

const unauthorizedUserError = {
  err: {
    status: 401,
    message: 'Unauthorized user',
  },
};

const editCategoriesError = {
  err: {
    status: 400,
    message: 'Categories cannot be edited',
  },
};

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'test' ? config.test : config.development,
);

const { Op } = Sequelize;

const findAll = async () => (BlogPost.findAll({
  include: [{ model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } }],
}));

const findByTerm = async (term) => (BlogPost.findAll({
  where: { [Op.or]: [{ title: { [Op.like]: `%${term}%` } },
    { content: { [Op.like]: `%${term}%` } }] },
  include: [{ model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } }],
}));

const findById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  if (!post) return postDoesntExistError;
  return post;
};

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
      const postsCategories = categoryIds.map(async (categoryId) => (PostCategory
      .create({ post_id: post.id, category_id: categoryId })));
    Promise.all(postsCategories, { transaction: t });
    await t.commit();
    return post;
  } catch (e) {
    await t.rollback();
    return { err: { message: e.message } };
  }
};

const update = async ({ id, title, content, userId, categoryIds }) => {
  if (categoryIds) return editCategoriesError;
  const currentPost = await BlogPost.findByPk(id);
  if (!currentPost) return postDoesntExistError;
  if (currentPost.userId !== userId) return unauthorizedUserError;
  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id } },
  );
  const newPost = await BlogPost.findOne({
    where: { id },
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });
  return newPost;
};

const remove = async ({ id, userId }) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return postDoesntExistError;
  if (post.userId !== userId) return unauthorizedUserError;
  await BlogPost.destroy({ where: { id } });
  return post;
};

module.exports = { findAll, findByTerm, findById, create, update, remove };