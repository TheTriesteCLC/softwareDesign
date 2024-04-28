const { multipleMongooseToObject, singleMongooseToObject } = require('../util/mongoose');

class siteController {
  //[GET] /login
  login(req, res, next) {
    let messFailed = "";
    if (req.query.status === 'failed') {
      messFailed = 'Wrong username or password.';
    }
    res.render('customer/login', { layout: 'customer/customLogin', messFailed });
  }
  
  //[GET] /logout
  logout(req, res, next) {
    console.log("Loging out");
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('./login');
    })
  }

  //[GET] /settings
  profile(req, res, next) {
    console.log(req.user);
    res.render('customer/profile', { layout: 'customer/main', user: req.user });
  }

  //[GET] /history
  history(req, res, next) {
    res.render('customer/history', { layout: 'customer/main' });
  }

  //[GET] /menu
  menu(req, res, next) {
    res.render('customer/menu', { layout: 'customer/main' });
  }

  //[GET] /schedule
  schedule(req, res) {
    res.render('customer/scheduleTimeAndDate', { layout: 'customer/main' });
  }

  //[GET] /home
  home(req, res) {
    res.render('customer/home', { layout: 'customer/main' });
  }

  //[GET] /signup
  signup(req, res) {
    res.render('customer/signup', { layout: 'customer/main' });
  }
}

const slugify = (textToSlugify) => {
  if (!textToSlugify) return '';

  const lowercaseText = textToSlugify.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ +(?= )/g, '');

  return lowercaseText.split(' ').join('-');
}

module.exports = new siteController;