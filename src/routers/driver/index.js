const express = require('express');
const router = express.Router();

const siteController = require('../../controllers/driver.c');

router.get('/login', siteController.login);
router.get('/home', (req, res) => {
    res.render( 'driver/home', { layout: 'driver/main' });   
})
router.get('/request', (req, res) => {
    res.render( 'driver/request', { layout: 'driver/main' });   
})

module.exports = router;