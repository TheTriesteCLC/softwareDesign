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

  home(req, res) {
    res.render( 'driver/home', { layout: 'driver/main' });   
  }
  
  confirm(req, res) {
    res.render( 'driver/confirm', { layout: 'driver/main' });   
  }

  request(req, res) {
    res.render( 'driver/request', { layout: 'driver/main' });   
  }

  signup(req, res) {
    res.render( 'driver/signup', { layout: 'driver/main' });   
  }
}

const slugify = (textToSlugify) => {
  if (!textToSlugify) return '';

  const lowercaseText = textToSlugify.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ +(?= )/g, '');

  return lowercaseText.split(' ').join('-');
}

module.exports = new siteController;