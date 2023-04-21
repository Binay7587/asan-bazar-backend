const productController = require("../app/controllers/product.controller");
const uploader = require("../app/middleware/uploader.middleware");
const authCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");

const router = require("express").Router();


// Web 
router.get("/active", productController.getActiveProducts);
router.get("/category/:slug", productController.getProductsByCategorySlug);
router.get("/brand/:slug", productController.getProductsByBrandSlug);

// CMS
router.route("/")
    .get(authCheck, isAdmin, productController.getAllProductsList)
    .post(authCheck, isAdmin, uploader.array('productImage'), productController.createProduct)

router.route("/:id")
    .get(authCheck, isAdmin, productController.fetchProductById)
    .put(authCheck, isAdmin, uploader.array('productImage'), productController.updateProduct)
    .delete(authCheck, isAdmin, productController.deleteProductById);

module.exports = router;