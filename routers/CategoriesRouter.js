const express = require('express');
const rescue = require('express-rescue');
const authentication = require('../middlewares/auth');
const { findAll, create } = require('../controllers/CategoriesController');

const router = express.Router();

router.get('/', authentication, rescue(findAll));
router.post('/', authentication, rescue(create));

module.exports = router;