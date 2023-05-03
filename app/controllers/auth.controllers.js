const userService = require('../services/user.service.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppConstants = require('../../config/constants.js');
const { sendEmail } = require('../services/mail.service.js');
const { hashPassword } = require('../../config/functions.js');

class AuthController {
    registerProcess = async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, address, phone, role, status } = req.body;

            let userPayload = await userService.validateRegisterData({
                name, email, password, confirmPassword, role, phone,
                address: address ? JSON.parse(address) : null,
                status: status ?? 'inactive',
            });
            // Hash password
            userPayload.password = await hashPassword(userPayload.password);
            // Set user profile if file exists
            if (req.file) {
                userPayload.userImage = `/userImage/${req.file.filename}`;
            }

            // Check if username and email already exist
            const userByEmail = await userService.getUserByEmail(userPayload.email);

            if (userByEmail) {
                throw ("Email already exists");
            }

            // Store user and user
            const user = await userService.registerUser(userPayload);
            // Email notification
            sendEmail({
                from: 'noreply@test.com',
                to: userPayload.email,
                subject: 'Account Registered!',
                textMessage: "Dear " + userPayload.name + ",\n\n" + 'Your account has been registered successfully.',
                htmlMessage: "<p>Dear " + userPayload.name + ",</p><p>Your account has been registered successfully.</p>"
            });

            res.json({
                result: user,
                msg: "User registered successfully",
                status: true,
                meta: null
            });
        }
        catch (err) {
            if (err.name === "SyntaxError") err = "Invalid JSON";
            next({ status: 400, msg: err.message ?? err });
        }
    }

    loginProcess = async (req, res, next) => {
        try {
            let payload = req.body;

            let detail = await userService.getUserByEmail(payload.email);

            if (!detail) {
                throw ('Invalid email or password.');
            } else {
                if (bcrypt.compareSync(payload.password, detail.password)) {
                    let token = jwt.sign({ _id: detail._id, role: detail.role }, AppConstants.JWT_SECRET, { expiresIn: '1d' });

                    sendEmail({
                        from: 'noreply@test.com',
                        to: detail.email,
                        subject: 'Successfully Logged In!',
                        textMessage: `Dear ${detail.name},\n\n We wanted to let you know that a successful login was made to your account on ${new Date}. If this was you, there is no need to take any further action. \n If this was not you, please contact us immediately. \n Thank you for using our service. \n\n Regards, \n ${AppConstants.APP_NAME}`,
                        htmlMessage: `<p>Dear ${detail.name},</p><p>We wanted to let you know that a successful login was made to your account on ${new Date}. If this was you, there is no need to take any further action.</p><p>If this was not you, please contact us immediately.</p><p>Thank you for using our service.</p><p>Regards,</p><p>${AppConstants.APP_NAME}</p>`
                    });

                    return res.json({
                        result: {
                            token: token,
                            user: detail
                        },
                        msg: "Login successfull",
                        status: true,
                        meta: null
                    });
                }
                else {
                    throw ('Invalid email or password.');
                }
            }

        } catch (err) {
            next({ status: 400, msg: err.message ?? err });
        }
    }

    logoutProcess = async (req, res, next) => {
        let userDetail = req.authUser;
        // Todo: Add logout functionality (Storing token in db)
        return res.json({
            result: null,
            msg: "User Logout successfully",
            status: true,
            meta: null
        })
    }

    changePasswordProcess = async (req, res, next) => {
        try {
            let payload = req.body;
            // validate payload
            let validatedData = await userService.validateChangePasswordData(payload);

            let loggedInUser = req.authUser;
            let toBeChanged = await userService.getUserByEmail(payload.email);

            if (!toBeChanged) {
                throw ('User doesn\'t exists.');
            } else if (!loggedInUser._id.equals(toBeChanged._id)) {
                throw ('You are not authorized to change password of this user.');
            } else {
                let hashedPassword = await bcrypt.hash(validatedData.password, 10);
                let response = await userService.updateUser(loggedInUser._id, { password: hashedPassword });

                res.json({
                    result: response,
                    msg: "Password changed successfully.",
                    status: true,
                    meta: null
                });
            }
        } catch (err) {
            next({ status: 400, msg: err.message ?? err });
        }
    }

    loggedInProfile = (req, res, next) => {
        let user = req.authUser;

        return res.json({
            result: {
                name: user.name,
                email: user.email,
                role: user.role,
                userImage: user.userImage,
                address: user.address,
                phone: user.phone
            },
            msg: "Profile fetched successfully",
            status: true,
            meta: null
        })
    }
}

const authController = new AuthController;
module.exports = authController;