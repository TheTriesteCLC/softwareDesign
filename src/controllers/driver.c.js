const Driver = require('../models/Driver');
const History = require('../models/history');
const moment = require('moment');
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
    res.render( 'driver/confirm', { layout: 'driver/main', user: JSON.stringify(req.user) });   
  }

  request(req, res) {
    res.render( 'driver/request', { layout: 'driver/main', user: JSON.stringify(req.user)  });   
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

  //[GET] /history
  async history(req, res, next) {
    console.log(req.user);
    var user_activities = await History.find({ driverId: req.user._id })
    .populate({
      path:"driverId",
      select: "fullname username",
      model:'Driver'
    }).lean().sort({"createdAt":-1});
    user_activities = formatDate(user_activities);

    let totalIncome = user_activities.reduce((accum, act) =>  parseFloat(act.fee) + accum, 0);
    let totalCabs = user_activities.length;
    //console.log(user_activities);

    //npm i moment[required]
    const currentMonth = moment().month() + 1; // Add 1 because moment().month() returns zero-based index
    const currentYear = moment().year();
    var driver_histories = await History.find({ driverId: req.user._id })
                                        .populate({path:"customerId",
                                                    select: "fullname tel",
                                                    model:'Customer'
                                        })
                                        .lean().sort({"createdAt":-1});
    let totalMonthIncome = 0;
    let totalMonthRuns = 0;

    driver_histories.forEach((history) => {
      const historyMonth = moment(history.updatedAt).month() + 1;
      const historyYear = moment(history.updatedAt).year();
      if (historyMonth === currentMonth && historyYear === currentYear) {
        totalMonthIncome += Number(history.fee);
        totalMonthRuns += 1;
      }
    });
    res.render('driver/history', { layout: 'driver/centerNav', activities: user_activities, totalCabs, totalIncome,totalMonthIncome,totalMonthRuns });
    // res.render('customer/history', { layout: 'customer/main'});
  }
}

const slugify = (textToSlugify) => {
  if (!textToSlugify) return '';

  const lowercaseText = textToSlugify.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ +(?= )/g, '');

  return lowercaseText.split(' ').join('-');
}

function formatDate(list){
  list = list.map(item => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toISOString().slice(0, 10); // Format as "YYYY-MM-DD"
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`; // Format as "HH:MM"
    item.formattedDateTime = `${formattedDate} ${formattedTime}`; // Combine date and time
    return item;
  });
  return list;
}

module.exports = new siteController;