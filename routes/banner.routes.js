const bannerController = require("../app/controllers/banner.controller");
const uploader = require("../app/middleware/uploader.middleware");
const authCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");

const router = require("express").Router();


// Web 
router.get("/list", bannerController.listForHomepage);

// CMS
router.route("/")
    .get(authCheck, isAdmin, bannerController.listAllBanners)
    .post(authCheck, isAdmin, uploader.single('bannerImage'), bannerController.createBanner)

router.route("/:id")
    .put(authCheck, isAdmin, uploader.single('bannerImage'), bannerController.updateBanner)
    .delete(authCheck, isAdmin, bannerController.deleteBannerById);

module.exports = router;