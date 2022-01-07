const PostsService = require('../services/PostsService');
const { validatePost } = require('../utils/validations');

const findAll = async (_req, res) => {
  const posts = await PostsService.findAll();
  return res.status(200).json(posts);
};

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  const entriesValidation = validatePost({ title, content, categoryIds });
  if (entriesValidation.err) return next(entriesValidation.err);
  const post = await PostsService.create({ title, content, userId, categoryIds });
  if (post.err) return next(post.err);
  return res.status(201).json({ id: post.id, userId, title, content });
};

module.exports = { findAll, create };