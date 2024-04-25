const express = require('express');
const router = express.Router();

const siteController = require('../../controllers/driver.c');

router.get('/login', siteController.login);
router.get('/home', siteController.home)
router.get('/confirm', siteController.confirm)
router.get('/request', siteController.request)

module.exports = router;