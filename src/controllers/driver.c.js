const { multipleMongooseToObject, singleMongooseToObject } = require('../util/mongoose');

class siteController {
  //[GET] /login
  login(req, res, next) {
    let messFailed = "";
    if (req.query.status === 'failed') {
      messFailed = 'Wrong username or password.';
    }
    res.render('driver/login', { layout: 'driver/customLogin', messFailed });
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

  home(req, res) {
    res.render( 'driver/home', { layout: 'driver/main' });   
  }
  
  confirm(req, res) {
    res.render( 'driver/confirm', { layout: 'driver/main' });   
  }

  request(req, res) {
    res.render( 'driver/request', { layout: 'driver/main' });   
  }

  profile(req, res) {
    res.render( 'driver/profile', { layout: 'driver/main', user: req.user });   
  }

  signup(req, res) {
    res.render( 'driver/signup', { layout: 'driver/main' });   
  }

  menu(req, res) {
    res.render( 'driver/menu', { layout: 'driver/main' });   
  }
}

const slugify = (textToSlugify) => {
  if (!textToSlugify) return '';

  const lowercaseText = textToSlugify.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ +(?= )/g, '');

  return lowercaseText.split(' ').join('-');
}

module.exports = new siteController;