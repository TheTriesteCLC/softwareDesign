const bcrypt = require('bcrypt')
const { userModel } = require('../models/user.m')

class AuthenticationService{
    static Signup = async ({ phone, password }) => {
        try {
            const passHash = await bcrypt.hash(password, 10)
            const newUser = await userModel.create({
                phone: phone,
                password: passHash
            })
            if (!newUser) throw new Error("Sign up failed");
            return {
                status: 201,
                message: "Sign up successed"
            }
        } catch (err) {
            return err
        }
    }
}

module.exports = AuthenticationService