const router = require("express").Router();

const cartController = require("../app/controllers/cart.controller");
const authCheck = require("../app/middleware/auth.middleware");
const { isCustomer } = require("../app/middleware/rbac.middleware");

router.post("/", authCheck, isCustomer, cartController.updateCart);
router.get("/code/:cartCode", authCheck, isCustomer, cartController.getCartByCartCode);
router.post("/detail", authCheck, isCustomer, cartController.getCartDetails);

module.exports = router;