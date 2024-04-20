const siteCustomerRouter = require('./site')

function route(app) {
  app.use('/customer', siteCustomerRouter);

}

module.exports = route;