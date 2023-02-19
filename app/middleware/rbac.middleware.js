const isAdmin = (req, res, next) => {
    if (req.authUser.role !== 'admin') {
        next({ status: 403, msg: 'You are not authorized to access.' });
    }
    next();
}

const isUser = (req, res, next) => {
    if (req.authUser.role !== 'user') {
        next({ status: 403, msg: 'You are not authorized to access.' });
    }
    next();
}

module.exports = {
    isAdmin,
    isUser
}