const express = require('express');
const rescue = require('express-rescue');
const authentication = require('../middlewares/auth');
const { findAll, findById, create, remove } = require('../controllers/UsersController');

const router = express.Router();

router.get('/', authentication, rescue(findAll));
router.get('/:id', authentication, rescue(findById));
router.post('/', rescue(create));
router.delete('/me', authentication, rescue(remove));

module.exports = router;