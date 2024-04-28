const { multipleMongooseToObject, singleMongooseToObject } = require('../util/mongoose');

class siteController {
  //[GET] /
  loginOption(req, res, next) {
    res.render('loginOption', { layout: 'main' });
  }
}

module.exports = new siteController;