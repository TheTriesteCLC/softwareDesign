const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport/passport')(passport);

const siteController = require('../../controllers/driver.c');

router.get('/history', isLoggedIn, siteController.history)
router.get('/home', isLoggedIn, siteController.home)
router.get('/confirm', isLoggedIn, siteController.confirm)
router.get('/request', isLoggedIn, siteController.request)
router.get('/menu', isLoggedIn, siteController.menu)
router.get('/profile', isLoggedIn, siteController.profile)
router.get('/update-profile',isLoggedIn , siteController.updateProfile);
router.post('/update-profile', isLoggedIn,siteController.update);
router.get('/logout', isLoggedIn, siteController.logout)
router.get('/chat', isLoggedIn,siteController.chat)


//Login
router.get('/login', siteController.login);
router.post('/login',
    passport.authenticate('local-login', { failureRedirect: './login?status=failed' }),
    function (req, res) {
        console.log("redirecting");
        console.log(req.user);
        res.redirect('./home');
    }
);

//Signup new driver
router.get('/signup', siteController.signup);
router.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: './signup' }),
    function (req, res) {
        console.log("redirecting");
        console.log(req.user);
        res.redirect('./home');
    }
);

router.get(/.*/, isLoggedIn, siteController.home)

function isLoggedIn(req, res, next) {

    console.log("Authenticate checking");
    if (req.isAuthenticated()) { // is authenticated
        return next();
    }

    // is not authenticated
    res.redirect('/driver/login');
}

module.exports = router;