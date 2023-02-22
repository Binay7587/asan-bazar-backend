const Joi = require('joi');
const MongoDBService = require('./mongoDB.service.js');

class UserService extends MongoDBService {
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
                    confirm_password: Joi.ref('password'),
                    role: Joi.any().valid('admin', 'user'),
                    status: Joi.string().valid('active', 'inactive'),
                    address: Joi.string(),
                    phone: Joi.string().min(10),
                    user_image: Joi.string().empty(),
                });

                let response = await userSchema.validateAsync(data);
                return response;
            }
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
            let response = await this.db.collection('users').insertOne(data);
            return response;
        }
        catch (err) {
            throw err;
        }
    }

    getUserByEmail = async (email) => {
        try {
            let response = await this.db.collection('users').findOne({ email: email });
            return response
        } catch (err) {
            throw err;
        }
    }
}

const userService = new UserService();
module.exports = userService;