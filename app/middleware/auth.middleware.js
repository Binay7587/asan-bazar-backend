const jwt = require('jsonwebtoken');
const AppConstants = require('../../config/constants.js');
const userService = require('../services/user.service.js');

const authCheck = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['token'];
        if (token) {
            token = (token.split(" ")).pop();
            if (!token || token === "null") return next({ status: 401, msg: "Unauthorized access" });

            let data = jwt.verify(token, AppConstants.JWT_SECRET);
            if (!data) {
                throw ("Invalid token");
            } else {
                let result = await userService.getUserById(data._id);
                //Check if user is available & active
                if (result) {
                    if (result.status !== "active") throw ("Your account is not active. Please contact admin.");
                    req.authUser = result;
                    next();
                } else {
                    throw ("User not found");
                }
            }
        } else {
            throw ("Token not found");
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") err = "Token expired";
        else if (err.name === "JsonWebTokenError") err = "Invalid token";

        return next({ status: 401, msg: `Unauthorized: ${err}` });
    }
}

module.exports = authCheck;