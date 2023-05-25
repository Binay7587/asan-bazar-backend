const userController = require("../app/controllers/user.controller");
const uploader = require("../app/middleware/uploader.middleware");
const authCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");

const router = require("express").Router();

// Web 
router.get("/active", userController.listActiveUsers);
router.get("/count", userController.fetchUserCount);
router.get("/type/:type", userController.listUsersByType);

// CMS
router.route("/")
    .get(authCheck, isAdmin, userController.listAllUsers)
    .post(authCheck, isAdmin, uploader.single('userImage'), userController.storeUser)

router.route("/:id")
    .get(authCheck, isAdmin, userController.fetchUserById)
    .put(authCheck, isAdmin, uploader.single('userImage'), userController.updateUser)
    .delete(authCheck, isAdmin, userController.deleteUserById);

module.exports = router;
