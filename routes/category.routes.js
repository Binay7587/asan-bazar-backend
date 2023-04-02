const categoryController = require("../app/controllers/category.controller");
const uploader = require("../app/middleware/uploader.middleware");
const authCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");

const router = require("express").Router();


// Web 
router.get("/active", categoryController.listActiveCategories);

// CMS
router.route("/")
    .get(authCheck, isAdmin, categoryController.listAllCategories)
    .post(authCheck, isAdmin, uploader.single('categoryImage'), categoryController.createCategory)

router.route("/:id")
    .get(authCheck, isAdmin, categoryController.fetchCategoryById)
    .put(authCheck, isAdmin, uploader.single('categoryImage'), categoryController.updateCategory)
    .delete(authCheck, isAdmin, categoryController.deleteCategoryById);

module.exports = router;