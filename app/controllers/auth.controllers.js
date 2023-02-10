class AuthController {
    registerProcess = (req, res, next) => {
        // 
        res.json({
            result: null, 
            msg: "Hello there",
            status: true, 
            meta: null
        })
    }

    loginProcess = (req, res, next) => {
        // TODO: 
        res.json({
            result: null, 
            msg: "Hello there",
            status: true, 
            meta: null
        })
    }

    changePasswordProcess = (req, res, next) => {

    }

    loggedInProfile = (req, res, next) => {
        
    }
}

const authController = new AuthController;
module.exports = authController;