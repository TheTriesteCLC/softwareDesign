const express = require('express');
const router = express.Router();

const siteController = require('../../controllers/customerControllers');

router.get('/login', siteController.login);

module.exports = router;