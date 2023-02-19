const router = require('express').Router()
const categoryController = require("../app/controllers/category.controllers");
const { isAdmin, isUser } = require("../app/middleware/rbac.middleware");


router.route("/")
    .get(isAdmin, categoryController.listCategory)
    .post(isAdmin, categoryController.createCategory)

router.route('/:id')
    .get(categoryController.getCategoryDetail)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)


module.exports = router;