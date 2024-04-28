const express = require('express')
const router = express.Router()

router.use('/v1/api', require('./auth'))
router.use('/driver', require('./driver'))
router.use('/customer', require('./customer'))
router.use('/', require('./site'))

module.exports = router