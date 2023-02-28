// const express = require("express");
// const router = express.Router()
const router = require("express").Router();

const auth_routes = require("./auth.routes");
const user_routes = require("./user.routes");
const cat_routes = require("./category.routes");
const banner_routes = require("./banner.routes");
const brand_routes = require("./brand.routes");
const authCheck = require("../app/middleware/auth.middleware");

router.use(auth_routes);
router.use("/user", authCheck, user_routes);
router.use("/category", authCheck, cat_routes);
router.use("/banner", banner_routes);
router.use("/brand", brand_routes);

// Routing Level Middleware
module.exports = router;