// const express = require("express");
// const router = express.Router()
const router = require("express").Router();

const auth_routes = require("./auth.routes");
const user_routes = require("./user.routes");
const cat_routes = require("./category.routes");


router.use(auth_routes);
router.use("/user", user_routes);
router.use("/category", cat_routes);


// Routing Level Middleware
module.exports = router;