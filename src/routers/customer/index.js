const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../config/passport/passport')(passport);

const siteController = require('../../controllers/customer.c');

router.get('/home', isLoggedIn, siteController.home);
router.get('/new-cabs', isLoggedIn, siteController.newCabs);
router.get('/favorite', siteController.favorite);
router.get('/add-favorite', siteController.addFavorite);
router.get('/menu', siteController.menu);
router.get('/update-profile', siteController.updateProfile);
router.post('/update-profile', siteController.update);
router.get('/profile', siteController.profile);
router.get('/history', siteController.history);

router.get('/schedule', siteController.schedule);
router.get('/logout',siteController.logout);

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

//Signup new customer
// router.post('/signup/available', siteController.avalable);
router.get('/signup', siteController.signup);
router.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: './signup?status=failed' }),
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
    res.redirect('/customer/login');
}

module.exports = router;