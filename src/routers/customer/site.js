const express = require('express');
const router = express.Router();

const siteController = require('../../controllers/customerControllers/siteController');

router.get('/login', siteController.login);

module.exports = router;