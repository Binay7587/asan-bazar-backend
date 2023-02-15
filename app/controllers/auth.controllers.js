const userService = require('../services/user.service.js');
const bcrypt = require('bcryptjs');

class AuthController {
    registerProcess = async (req, res, next) => {
        try {
            let payload = req.body;
            if (req.file) {
                payload.image = req.file.filename;
            }
            //validation
            let validatedData = await userService.validateRegisterData(payload);
            //password encryption
            validatedData.password = await bcrypt.hash(validatedData.password, 10);
            // bcrypt.compare("password", hashedPassword);

            res.json({
                result: validatedData,
                msg: "Hello there",
                status: true,
                meta: null
            })
        }
        catch (err) {
            console.log(err);
            next({ status: 400, msg: err.message });
        }
    }

    loginProcess = (req, res, next) => {
        // TODO: 
        res.json({
            result: null,
            msg: "Hello there",
            status: true,
            meta: null
        })
    }

    changePasswordProcess = (req, res, next) => {

    }

    loggedInProfile = (req, res, next) => {

    }
}

const authController = new AuthController;
module.exports = authController;