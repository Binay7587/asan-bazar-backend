const Joi = require('joi');
const UserModel = require('../model/user.model.js');

class UserService {
    validateRegisterData = async (data) => {
        try {
            if (!data) {
                throw new Error('Empty payload.');
            } else {
                const userSchema = Joi.object().keys({
                    name: Joi.string()
                        .min(5)
                        .max(30)
                        .required(),
                    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
                    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                    confirmPassword: Joi.ref('password'),
                    role: Joi.any().valid('admin', 'user'),
                    status: Joi.string().valid('active', 'inactive'),
                    address: Joi.object(),
                    phone: Joi.string().min(10),
                    userImage: Joi.string().empty(),
                });

                return await userSchema.validateAsync(data);
            }
        }
        catch (err) {
            if (err?.details) {
                throw err.details[0];
            }
            throw err;
        }
    }

    validateChangePasswordData = async (data) => {
        try {
            const userSchema = Joi.object().keys({
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                confirmPassword: Joi.ref('password')
            });

            return await userSchema.validateAsync(data);
        }
        catch (err) {
            if (err?.details) {
                throw err.details[0];
            }
            throw err;
        }
    }

    registerUser = async (data) => {
        try {
            let user = new UserModel(data); // create new user
            return await user.save(); // save user        
        }
        catch (err) {
            throw err;
        }
    }

    getUserByEmail = async (email) => {
        try {
            return await UserModel.findOne({ email: email });
        } catch (err) {
            throw err;
        }
    }

    getUserById = async (id) => {
        try {
            return await UserModel.findById(id);
        } catch (err) {
            throw err;
        }
    }

    getAllUsers = async () => {
        try {
            return await UserModel.find();
        } catch (err) {
            throw err;
        }
    }

    updateUser = async (id, data) => {
        try {
            return await UserModel.findByIdAndUpdate(id, { $set: data });
        } catch (err) {
            throw err;
        }
    }
}

const userService = new UserService();
module.exports = userService;