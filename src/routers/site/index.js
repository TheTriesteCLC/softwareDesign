const express = require('express');
const router = express.Router();

const siteController = require('../../controllers/site.c');

router.get('/', siteController.loginOption)
module.exports = router;