const Driver = require('../models/Driver');
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
    res.render('driver/home', { layout: 'driver/centerNav', user: JSON.stringify(req.user) });   
  }
  
  confirm(req, res) {
    res.render( 'driver/confirm', { layout: 'driver/main' });   
  }

  request(req, res) {
    res.render( 'driver/request', { layout: 'driver/main' });   
  }

  profile(req, res) {
    res.render( 'driver/profile', { layout: 'driver/centerNav', user: req.user });   
  }

  chat(req, res) {
    res.render('driver/chat', {layout: 'driver/main'})
  }
 
  //[GET] /update-profile
  updateProfile(req, res) {
    res.render( 'driver/updateProfile', { layout: 'driver/centerNav', user: req.user });   
  }

  //[POST] /update-profile
  async update(req, res, next) {
    const formData = req.body;
    console.log(formData)

    // get current user session
    var driver = await Driver.findOne({ username: req.user.username });

    // check two passwords
    var checkPass = await driver.comparePassword(formData.password);

    if (checkPass) {
      driver = await Driver.findOneAndUpdate({ username: formData.username },
        {
          fullname: formData.fullname,
          email: formData.email,
          dob: formData.dob,
          tel: formData.phone,
          IDnumber: formData.IDnumber,
          vehicle: formData.vehicle,
          plate: formData.plate,
        },
        {
          new: true
        }
      );

      console.log('Updated');

      if (driver === null) {
        res.redirect('/driver/update-profile');
      } else {
        // update session user
        req.session.passport.user = driver;
        res.redirect('/driver/profile');
      }
    }
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