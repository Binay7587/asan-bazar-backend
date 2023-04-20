const Joi = require('joi');
const UserModel = require('../model/user.model.js');

class UserService {
    validateRegisterData = async (data) => {
        try {
            if (!data) {
                throw new Error('Empty payload.');
            } else {
                const addressKeys = Joi.object({
                    state: Joi.string(), district: Joi.string(), municipality: Joi.string(), street: Joi.string(), houseNumber: Joi.string(), postcode: Joi.string()
                });
                const userSchema = Joi.object({
                    name: Joi.string()
                        .min(5)
                        .max(30)
                        .required(),
                    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
                    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,30}$/).required(),
                    confirmPassword: Joi.ref('password'),
                    role: Joi.any().valid('admin', 'customer', 'seller').messages({
                        'any.only': 'Role must be admin, customer or seller'
                    }),
                    status: Joi.string().valid('active', 'inactive'),
                    address: Joi.object({ temp: addressKeys, perm: addressKeys }).required(),
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
                password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,30}$/).required(),
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

    // Get user by user type
    getUsersByType = async (type) => {
        try {
            return await UserModel.find({
                role: type
            })
            .sort({ _id: -1 }) // Sort by descending order
        } catch (err) {
            throw err;
        }
    }

    // Get Count
    getCount = async () => {
        try {
            return await UserModel.count();
        } catch (err) {
            throw err;
        }
    }

    // Get all users
    getAllUsers = async (config) => {
        try {
            let skip = (config.page - 1) * config.perPage;
            return await UserModel.find()
                .sort({ _id: -1 }) // Sort by descending order
                .skip(skip)
                .limit(config.perPage);
        } catch (err) {
            throw err;
        }
    }

    // Get active users
    getActiveUsers = async () => {
        try {
            return await UserModel.find({
                status: 'active'
            })
                .sort({ _id: -1 }) // Sort by descending order
                .limit(10);
        } catch (err) {
            throw err;
        }
    }

    // Get user by id
    getUserById = async (id) => {
        try {
            return await UserModel.findById(id);
        } catch (err) {
            throw err;
        }
    }

    // Update user
    updateUserById = async (id, data) => {
        try {
            return await UserModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        } catch (err) {
            throw err;
        }
    }

    // Delete user
    deleteUserById = async (id) => {
        try {
            return await UserModel.findByIdAndDelete(id);
        } catch (err) {
            throw err;
        }
    }
}

const userService = new UserService();
module.exports = userService;