const { multipleMongooseToObject, singleMongooseToObject } = require('../util/mongoose');

class siteController {
  //[GET] /login
  login(req, res, next) {
    let messFailed = "";
    if (req.query.status === 'failed') {
      messFailed = 'Wrong username or password.';
    }
    res.render('customer/login', { layout: 'customer/main', messFailed });
  }

  //[GET] /settings
  settings(req, res, next) {
    res.render('customer/settings', { layout: 'customer/main' });
  }

  //[GET] /menu
  menu(req, res, next) {
    res.render('customer/menu', { layout: 'customer/main' });
  }

  schedule(req, res) {
    res.render('customer/scheduleTimeAndDate', { layout: 'customer/main' });
  }
}

const slugify = (textToSlugify) => {
  if (!textToSlugify) return '';

  const lowercaseText = textToSlugify.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ +(?= )/g, '');

  return lowercaseText.split(' ').join('-');
}

module.exports = new siteController;