const brandController = require("../app/controllers/brand.controller");
const uploader = require("../app/middleware/uploader.middleware");
const authCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");

const router = require("express").Router();


// Web 
router.get("/all", brandController.getAllBrands);
router.get("/active", brandController.listActiveBrands);

// CMS
router.route("/")
    .get(authCheck, isAdmin, brandController.getAllBrandsList)
    .post(authCheck, isAdmin, uploader.single('brandImage'), brandController.createBrand)

router.route("/:id")
    .get(authCheck, isAdmin, brandController.fetchBrandById)
    .put(authCheck, isAdmin, uploader.single('brandImage'), brandController.updateBrand)
    .delete(authCheck, isAdmin, brandController.deleteBrandById);

module.exports = router;