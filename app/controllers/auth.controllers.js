const userService = require('../services/user.service.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        let detail = {
            _id: 1,
            name: "Admin User",
            email: "admin@broadway.com",
            password: "$2a$10$HOvvBxEgPKKQQzXQzrGTLO74MKCHCHd7BhVujSK3ip / f4fjjFtyke",
            confirmPassword: "superadmin",
            role: "admin",
            status: "active",
            address: "Tinkune, Kathmandu",
            phone: " + 977 9000000000",
            image: "1676489077266 - 0.9149544986686298 - repository - open - graph - template.png"
        };
        let token = jwt.sign({ userId: detail._id }, "$ecReT", { expiresIn: "1h" });
        res.json({
            detail: detail,
            token: token
        })
    }

    changePasswordProcess = (req, res, next) => {

    }

    loggedInProfile = (req, res, next) => {

    }
}

const authController = new AuthController;
module.exports = authController;