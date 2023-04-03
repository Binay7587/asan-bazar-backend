const { deleteImage, hashPassword } = require('../../config/functions');
const userService = require('../services/user.service');

class UserController {
    // List all users
    listAllUsers = async (req, res, next) => {
        try {
            // ?page=1&perPage=10
            let currentPage = Number(req.query.page ?? 1);
            let perPage = Number(req.query.perPage ?? 10);

            const users = await userService.getAllUsers({ page: currentPage, perPage: perPage });

            res.json({
                result: users,
                msg: "Users fetched successfully.",
                status: true,
                meta: {
                    currentPage: currentPage,
                    perPage: perPage,
                    totalCount: await userService.getCount()
                }
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error: ${err.message ?? err}` });
        }
    }

    // List active users for homepage
    listActiveUsers = async (req, res, next) => {
        try {
            const users = await userService.getActiveUsers();

            res.json({
                result: users,
                msg: "Users fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error: ${err.message ?? err}` });
        }
    }

    // Create a new user
    storeUser = async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, address, phone, role, status } = req.body;

            let userPayload = await userService.validateRegisterData({
                name, email, password, confirmPassword, role, phone,
                address: address ? JSON.parse(address) : null,
                status: status ?? 'inactive',
            });
            // Hash password
            userPayload.password = await hashPassword(userPayload.password);
            // Set user profile if file exists
            if (req.file) {
                userPayload.userImage = `/userImage/${req.file.filename}`;
            }

            // Check if username and email already exist
            const userByEmail = await userService.getUserByEmail(userPayload.email);

            if (userByEmail) {
                throw ("Email already exists");
            }

            // Store user and user
            const user = await userService.registerUser(userPayload);

            res.json({
                result: user,
                msg: "User stored successfully",
                status: true,
                meta: null
            });
        } catch (err) {
            next({ status: 400, msg: `Store error: ${err.message ?? err}` });
        }
    };

    fetchUserById = async (req, res, next) => {
        try {
            let user = await userService.getUserById(req.params.id);
            if (!user) {
                throw ('User not found.');
            }
            res.json({
                result: user,
                msg: "User fetched successfully",
                status: true,
                meta: null
            })
        } catch (err) {
            next({ status: 400, msg: `Fetch error: ${err.message ?? err}` });
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, email, password, confirmPassword, address, phone, role, status } = req.body;

            // Validate user payload
            const userPayload = await userService.validateRegisterData({
                name, email, password, confirmPassword, role,
                address: address ? JSON.parse(address) : null, phone,
                status: status ?? 'inactive',
            });

            // Check if username and email already exist
            const userByEmail = await userService.getUserByEmail(userPayload.email);
            const userData = await userService.getUserById(id);

            if (userData) {
                if (userByEmail && !userByEmail._id.equals(userData._id)) {
                    throw new Error("Email already exists");
                }

                // Hash password
                if (userPayload.password) {
                    userPayload.password = await hashPassword(userPayload.password);
                }

                if (req.file) {
                    userPayload.userImage = `/userImage/${req.file.filename}`; // new image
                    deleteImage(`${process.cwd()}/public/uploads/images`, userData.userImage); // delete old image
                } else {
                    userPayload.userImage = userData.userImage; // keep old image
                }

                // Update user
                const user = await userService.updateUserById(id, userPayload);

                res.json({
                    result: user,
                    msg: "User updated successfully",
                    status: true,
                    meta: null
                });
            } else {
                throw new Error("User not found");
            }
        } catch (err) {
            next({ status: 400, msg: `Update error: ${err.message ?? err}` });
        }
    }

    // Delete a user
    deleteUserById = async (req, res, next) => {
        try {
            let response = await userService.deleteUserById(req.params.id);
            if (response) {
                if (response.userImage) {
                    deleteImage(`${process.cwd()}/public/uploads/images`, response.userImage);
                }
                res.json({
                    result: response,
                    msg: "User deleted successfully.",
                    status: true,
                    meta: null
                });
            } else {
                throw ('User already deleted or does not exist.');
            }
        }
        catch (err) {
            next({ status: 400, msg: `Delete Error: ${err.message ?? err}` });
        }
    }
}

const userController = new UserController();
module.exports = userController;