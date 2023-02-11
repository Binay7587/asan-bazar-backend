class UserController {
    createUser = (req, res, next) => {
        // TODO: 
    }

    listUsers = (req, res, next) => {
        // user list
        let users = [
            {
                _id: 1,
                name: "Sandesh Bhattarai",
                email: "sandesh.bhattarai@broadwayinfosys.com",
                role: "admin"
            }
        ];
        res.json({
            result: users,
            status: true,
            msg: "User Fetched",
            meta: {
                totalCount: 1,
                perPage: 10,
                currentPage: 1
            }
        })
    }

    getUserDetail = (req, res, next) => {
        // TODO: Get user detail by id/slug
    }

    updateUser = (req, res, next) => {
        // TODO: Update user by id/slug/name
    }

    deleteUser = (req, res, next) => {
        // TODO: 
    }
}
const userCtrl = new UserController();
module.exports = userCtrl;