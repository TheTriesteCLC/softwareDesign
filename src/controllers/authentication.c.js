const AuthenticateService = require('../services/authentication.service')

class AuthenticationController {
    signUp = async (req, res, next) => {
        try {
            res.status(201).json(await AuthenticateService.Signup(req.body))
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new AuthenticationController()