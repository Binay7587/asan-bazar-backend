const userService = require('../services/user.service.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppConstants = require('../../config/constants.js');
const { sendEmail } = require('../services/mail.service.js');
const { MongoClient } = require('mongodb');
const dbUrl = "mongodb://127.0.0.1:27017";

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

            //TODO: save data
            MongoClient.connect(dbUrl)
                .then(client => {
                    // Selection of database
                    let db = client.db('learning-mern');
                    // Selection of collection
                    db.collection('users').insertOne(validatedData)
                        .then(result => {
                            //Email notification
                            sendEmail({
                                from: 'noreply@test.com',
                                to: validatedData.email,
                                subject: 'Account Registered!',
                                textMessage: "Dear " + validatedData.name + ",\n\n" + 'Your account has been registered successfully.',
                                htmlMessage: "<p>Dear " + validatedData.name + ",</p><p>Your account has been registered successfully.</p>"
                            });

                            res.json({
                                result: result,
                                msg: "Your account has been registered successfully.",
                                status: true,
                                meta: null
                            })
                        })
                        .catch(err => {
                            next({ status: 400, msg: err });
                        });

                })
                .catch(err => {
                    next({ status: 400, msg: err });
                });
        }
        catch (err) {
            next({ status: 400, msg: err.message });
        }
    }

    loginProcess = (req, res, next) => {
        let data = req.body;
        MongoClient.connect(dbUrl)
            .then(client => {
                // Selection of database
                let db = client.db('learning-mern');
                // Selection of collection
                db.collection('users').findOne({ email: data.email })
                    .then(result => {
                        if (!result) {
                            return next({ status: 400, msg: "Invalid email or password" });
                        } else if (bcrypt.compareSync(data.password, result.password)) {
                            let token = jwt.sign({ _id: result._id, role: result.role }, AppConstants.JWT_SECRET, { expiresIn: '1d' });

                            sendEmail({
                                from: 'noreply@test.com',
                                to: result.email,
                                subject: 'Successfully Logged In!',
                                textMessage: `Dear ${result.name},\n\n We wanted to let you know that a successful login was made to your account on ${new Date}. If this was you, there is no need to take any further action. \n If this was not you, please contact us immediately. \n Thank you for using our service. \n\n Regards, \n ${AppConstants.APP_NAME}`,
                                htmlMessage: `<p>Dear ${result.name},</p><p>We wanted to let you know that a successful login was made to your account on ${new Date}. If this was you, there is no need to take any further action.</p><p>If this was not you, please contact us immediately.</p><p>Thank you for using our service.</p><p>Regards,</p><p>${AppConstants.APP_NAME}</p>`
                            });

                            return res.json({
                                result: token,
                                msg: "Login successfull",
                                status: true,
                                meta: null
                            });
                        }
                        else {
                            return next({ status: 400, msg: "Invalid email or password" });
                        }
                    })
                    .catch(err => {
                        next({ status: 400, msg: err });
                    });
            })
            .catch(err => {
                next({ status: 400, msg: err });
            });
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