const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport/passport')(passport);

const siteController = require('../../controllers/customer.c');

router.get('/menu', siteController.menu);
router.get('/settings', siteController.settings);

router.get('/schedule', siteController.schedule);

//Login
router.get('/login', siteController.login);
router.post('/login',
    passport.authenticate('local-login', { failureRedirect: './login?status=failed' }),
    function (req, res) {
        console.log("redirecting");
        res.redirect('./dashboard');
    }
);

//Signup new customer
// router.post('/signup/available', siteController.avalable);
router.get('/signup', siteController.signup);
router.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: './signup' }),
    function (req, res) {
        console.log("redirecting");
        console.log(req.user);
        res.redirect('/');
    }
);

router.get('/', siteController.homepage);

module.exports = router;