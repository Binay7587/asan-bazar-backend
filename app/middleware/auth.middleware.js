const jwt = require('jsonwebtoken');
const AppConstants = require('../../config/constants.js');

const authCheck = (req, res, next) => {
    try {
        // TODO: Check if user is logged in using token
        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['token'];
        if (token) {
            token = (token.split(" ")).pop();
            if (!token || token === "null") return next({ status: 401, msg: "Unauthorized access" });

            let data = jwt.verify(token, AppConstants.JWT_SECRET);

            //TODO: Check if user is available & active
            let user = {
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
            if (user && user.status === "active") {
                req.authUser = user;
                next();
            } else {
                return next({ status: 401, msg: "Unauthorized access" });
            }
        } else {
            return next({ status: 401, msg: "Unauthorized access" });
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") err = "Token expired";
        else if (err.name === "JsonWebTokenError") err = "Invalid token";

        return next({ status: 401, msg: `Unauthorized: ${err}` });
    }
}

module.exports = authCheck;