const siteDriverRouter = require('./site')

function route(app) {
  app.use('/driver', siteDriverRouter);

}

module.exports = route;