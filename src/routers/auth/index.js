const express = require('express')
const router = express.Router()
const authenticateController = require('../../controllers/authentication.c')

router.post('/user/signup', authenticateController.signUp)

module.exports = router