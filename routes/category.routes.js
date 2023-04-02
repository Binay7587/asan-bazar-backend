const categoryController = require("../app/controllers/category.controller");
const uploader = require("../app/middleware/uploader.middleware");
const authCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");

const router = require("express").Router();


// Web 
router.get("/all", categoryController.getAllCategories);
router.get("/active", categoryController.getActiveCategories);

// CMS
router.route("/")
    .get(authCheck, isAdmin, categoryController.getAllCategoriesList)
    .post(authCheck, isAdmin, uploader.single('categoryImage'), categoryController.createCategory)

router.route("/:id")
    .get(authCheck, isAdmin, categoryController.fetchCategoryById)
    .put(authCheck, isAdmin, uploader.single('categoryImage'), categoryController.updateCategory)
    .delete(authCheck, isAdmin, categoryController.deleteCategoryById);

module.exports = router;