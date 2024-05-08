const { multipleMongooseToObject, singleMongooseToObject } = require('../util/mongoose');
const History = require('../models/history')

class siteController {
  //[GET] /
  loginOption(req, res, next) {
    res.render('loginOption', { layout: 'main' });
  }

  //[GET] /home
  home(req, res, next) {
    res.render('homepage', { layout: 'main' });
  }

  async saveHistory(req, res) {
    const data = req.body
    await History.create({
      customerId: data.user.id,
      driverId: data.idDriver,
      vehicle: "motobike",
      start: data.user.start.value,
      destination: data.user.end.value
      })
    res.send("success");
  }
}

module.exports = new siteController;