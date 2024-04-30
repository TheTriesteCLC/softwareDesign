const Customer = require('../models/Customer');
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
    res.render('customer/profile', { layout: 'customer/centerNav', user: req.user });
  }

  //[GET] /update-profile
  updateProfile(req, res, next) {
    console.log(req.user);
    res.render('customer/updateProfile', { layout: 'customer/centerNav', user: req.user });
  }

  //[POST] /update-profile
  async update(req, res, next) {
    const formData = req.body;

    // get current user session
    var customer = await Customer.findOne({ username: req.user.username });

    // check two passwords
    var checkPass = await customer.comparePassword(formData.password);

    if (checkPass) {
      customer = await Customer.findOneAndUpdate({ username: formData.username },
        {
          fullname: formData.fullname,
          email: formData.email,
          dob: formData.dob,
          tel: formData.phone,
        },
        {
          new: true
        }
      );

      console.log('Updated');

      if (customer === null) {
        res.redirect('/customer/update-profile');
      } else {
        // update session user
        req.session.passport.user = customer;
        res.redirect('/customer/profile');
      }
    }
    // res.json({ huhu });
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
    res.render('customer/home', { layout: 'customer/centerNav' });
  }

  //[GET] /new-cabs
  newCabs(req, res) {
    res.render('customer/newCabs', { layout: 'customer/newCabs' });
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