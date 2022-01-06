const express = require('express');
const rescue = require('express-rescue');
const authentication = require('../middlewares/auth');
const { findAll, create } = require('../controllers/UsersController');

const router = express.Router();

router.get('/', authentication, rescue(findAll));
router.post('/', rescue(create));

module.exports = router;