const PostsService = require('../services/PostsService');
const { validatePost } = require('../utils/validations');

const findAll = async (req, res) => {
  if (req.query) {
    const posts = await PostsService.findByTerm(req.query.q);
    return res.status(200).json(posts);
  }
  const posts = await PostsService.findAll();
  return res.status(200).json(posts);
};

const findById = async (req, res, next) => {
  const post = await PostsService.findById(req.params.id);
  if (post.err) return next(post.err);
  return res.status(200).json(post);
};

const findByTerm = async (req, res) => {
  const posts = await PostsService.findByTerm(req.params.searchTerm);
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

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  const entriesValidation = validatePost({ title, content, categoryIds: [] });
  if (entriesValidation.err) return next(entriesValidation.err);
  const post = await PostsService.update({ id, title, content, userId, categoryIds });
  if (post.err) return next(post.err);
  return res.status(200).json(post);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const post = await PostsService.remove({ id, userId });
  if (post.err) return next(post.err);
  return res.status(204).json(post);
};

module.exports = { findAll, findById, findByTerm, create, update, remove };