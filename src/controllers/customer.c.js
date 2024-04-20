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
}

const slugify = (textToSlugify) => {
  if (!textToSlugify) return '';

  const lowercaseText = textToSlugify.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ +(?= )/g, '');

  return lowercaseText.split(' ').join('-');
}

module.exports = new siteController;