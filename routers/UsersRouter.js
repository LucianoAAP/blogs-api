const express = require('express');
const rescue = require('express-rescue');
const { create } = require('../controllers/UsersController');

const router = express.Router();

router.post('/', rescue(create));

module.exports = router;