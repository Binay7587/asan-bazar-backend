const isAdmin = (req, res, next) => {
    if (req.authUser.role !== 'admin') {
        next({ status: 403, msg: 'You are not authorized to access.' });
    }
    next();
}

const isCustomer = (req, res, next) => {
    if (req.authUser.role !== 'customer') {
        next({ status: 403, msg: 'You are not authorized to access.' });
    }
    next();
}

const isSeller = (req, res, next) => {
    if (req.authUser.role !== 'seller') {
        next({ status: 403, msg: 'You are not authorized to access.' });
    }
    next();
}

module.exports = {
    isAdmin,
    isCustomer,
    isSeller
}