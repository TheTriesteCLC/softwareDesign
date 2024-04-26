const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport/passport')(passport);

const siteController = require('../../controllers/driver.c');

router.get('/login', siteController.login);
router.get('/home', siteController.home)
router.get('/confirm', siteController.confirm)
router.get('/request', siteController.request)

//Signup new driver
router.get('/signup', siteController.signup);
router.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: './signup' }),
    function (req, res) {
        console.log("redirecting");
        console.log(req.user);
        res.redirect('/');
    }
);

module.exports = router;