const Joi = require('joi');

class UserService {
    validateRegisterData(data) {
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
                address: Joi.string(),
                phone: Joi.string().min(10),
            });

            let response = userSchema.validateAsync(data);
            return response;
        }
    }
}

const userService = new UserService();
module.exports = userService;