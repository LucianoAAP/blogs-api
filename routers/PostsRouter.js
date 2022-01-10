const express = require('express');
const rescue = require('express-rescue');
const authentication = require('../middlewares/auth');
const {
  findAll,
  findByTerm,
  findById, create,
  update, remove,
} = require('../controllers/PostsController');

const router = express.Router();

router.get('/', authentication, rescue(findAll));
router.get('/search', authentication, rescue(findByTerm));
router.get('/:id', authentication, rescue(findById));
router.post('/', authentication, rescue(create));
router.put('/:id', authentication, rescue(update));
router.delete('/:id', authentication, rescue(remove));

module.exports = router;