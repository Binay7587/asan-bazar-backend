const jwt = require('jsonwebtoken');
const AppConstants = require('../../config/constants.js');
const { MongoClient, ObjectId } = require('mongodb');
const dbUrl = "mongodb://127.0.0.1:27017";

const authCheck = (req, res, next) => {
    try {
        // TODO: Check if user is logged in using token
        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['token'];
        if (token) {
            token = (token.split(" ")).pop();
            if (!token || token === "null") return next({ status: 401, msg: "Unauthorized access" });

            let data = jwt.verify(token, AppConstants.JWT_SECRET);
            MongoClient.connect(dbUrl)
                .then(client => {
                    // Selection of database
                    let db = client.db('learning-mern');
                    // Selection of collection and find user
                    db.collection('users').findOne({ _id: new ObjectId(data._id) })
                        .then(result => {
                            //Check if user is available & active
                            if (result && result.status === "active") {
                                req.authUser = result;
                                next();
                            } else {
                                return next({ status: 401, msg: "Unauthorized access" });
                            }
                        })
                        .catch(err => {
                            next({ status: 400, msg: err });
                        })
                })
                .catch(err => {
                    next({ status: 400, msg: err });
                });
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