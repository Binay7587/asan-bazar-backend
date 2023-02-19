// const express = require("express");
// const router = express.Router()
const router = require("express").Router();

const auth_routes = require("./auth.routes");
const user_routes = require("./user.routes");
const cat_routes = require("./category.routes");
const authCheck = require("../app/middleware/auth.middleware");

router.use(auth_routes);
router.use("/user", authCheck, user_routes);
router.use("/category", authCheck, cat_routes);


// Routing Level Middleware
module.exports = router;