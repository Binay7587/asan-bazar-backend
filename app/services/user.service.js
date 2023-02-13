class UserService {
    validateRegisterData(data) {
        if (!data) {
            throw new Error('Empty payload.');
        } else if (!data.name) {
            throw new Error('Name is required.');
        } else if (!data.email) {
            throw new Error('Email is required.');
        } else if (!data.password) {
            throw new Error('Password is required.');
        } else if (!data.confirmPassword) {
            throw new Error('Confirm Password is required.');
        } else if (data.password !== data.confirmPassword) {
            throw new Error('Password and Confirm Password must be same.');
        }
    }
}

const userService = new UserService();
module.exports = userService;