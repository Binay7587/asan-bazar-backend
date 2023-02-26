const bannerController = require("../app/controllers/banner.controller");
const authCheck = require("../app/middleware/auth.middleware");
const { isAdmin } = require("../app/middleware/rbac.middleware");

const router = require("express").Router();


// Web 
router.get("/list", bannerController.listForHomepage);

// CMS
router.route("/")
    .get(authCheck, isAdmin, bannerController.listAllBanners);

module.exports = router;