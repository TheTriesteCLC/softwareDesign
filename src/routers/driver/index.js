const express = require('express');
const router = express.Router();

const siteController = require('../../controllers/driverControllers');

router.get('/login', siteController.login);

module.exports = router;