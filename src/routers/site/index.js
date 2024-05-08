const express = require('express');
const router = express.Router();

const siteController = require('../../controllers/site.c');

router.get('/home', siteController.home)
router.post('/save/history', siteController.saveHistory)

router.get(/.*/, siteController.home)

module.exports = router;