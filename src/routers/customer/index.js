const express = require('express');
const router = express.Router();

const siteController = require('../../controllers/customer.c');

router.get('/settings', siteController.settings);
router.get('/login', siteController.login);

module.exports = router;