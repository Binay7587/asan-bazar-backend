const userService = require('../services/user.service.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppConstants = require('../../config/constants.js');

class AuthController {
    registerProcess = async (req, res, next) => {
        try {
            let payload = req.body;
            if (req.file) {
                payload.user_image = `/uploads/user_image/${req.file.filename}`;
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
        // TODO: Login process
        let data = req.body;
        let detail = {
            _id: 1,
            name: "Admin User",
            email: "admin@broadway.com",
            password: "$2a$10$Sj16j8aSGiGCO.CyJHC3Qu13QLodI/2yCCZIkaReJNUTa/5pXyygO",
            confirmPassword: "superadmin",
            role: "admin",
            status: "active",
            address: "Tinkune, Kathmandu",
            phone: " + 977 9000000000",
            image: "1676489077266 - 0.9149544986686298 - repository - open - graph - template.png"
        };

        if (!detail) {
            return next({ status: 400, msg: "Invalid email or password" });
        } else if (bcrypt.compareSync(data.password, detail.password)) {
            let token = jwt.sign({ _id: detail._id, role: detail.role }, AppConstants.JWT_SECRET, { expiresIn: '1d' });
            return res.json({
                result: token,
                msg: "Login successfull",
                status: true,
                meta: null
            });
        } else {
            return next({ status: 400, msg: "Invalid email or password" });
        }
    }

    changePasswordProcess = (req, res, next) => {

    }

    loggedInProfile = (req, res, next) => {

        return res.json({
            result: req.authUser,
            msg: "Profile fetched successfully",
            status: true,
            meta: null
        })
    }
}

const authController = new AuthController;
module.exports = authController;