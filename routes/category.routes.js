const router = require('express').Router()
const categoryController = require("../app/controllers/category.controllers");


router.route("/")
    .get(categoryController.listCategory)
    .post(categoryController.createCategory)

router.route('/:id')
    .get(categoryController.getCategoryDetail)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)


module.exports = router;