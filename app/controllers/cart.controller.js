const { randomString } = require("../../config/functions");
const cartService = require("../services/cart.service");
const productService = require("../services/product.service");

class CartController {
    getCartByCartCode = async (req, res, next) => {
        try {
            let cartCode = req.params.cartCode;
            let cart = await cartService.getCartByCartCode(cartCode);
            res.json({
                result: cart,
                msg: "Cart fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    getCartDetails = async (req, res, next) => {
        try {
            let products = req.body.products; // [{productId, quantity}, {productId, quantity}]
            let cartDetail = await cartService.setCartDetail(products); // [{productId, title, price, amount, quantity}]

            res.json({
                result: cartDetail,
                msg: "Cart fetched successfully.",
                status: true,
                meta: null
            });
        }
        catch (err) {
            next({ status: 400, msg: `List Error:  ${err.message ?? err}` });
        }
    }

    updateCart = async (req, res, next) => {
        try {
            // {productId, quantity, cartId}
            let payload = req.body;
            let cartCode = payload.cartId != "" && payload.cartId != null ? payload.cartId : randomString(10);
            let product = await productService.getProductById(payload.productId);
            let existingCart = await cartService.getCartByCartCode(cartCode);
            let subTotal = 0;
            let data = {};
            if (existingCart) {
                data = { ...existingCart }
                if (existingCart.status != "pending") {
                    next({ status: 400, msg: `Cart is already ${existingCart.status}` });
                } else {
                    let productIndex = data.products.findIndex(item => item.product == payload.productId);
                    if (productIndex > -1) {
                        data.products[productIndex].quantity = Number(data.products[productIndex].quantity) + Number(payload.quantity);
                        data.products[productIndex].totalAmount = Number(data.products[productIndex].quantity) * product.afterDiscount;
                    } else {
                        data.products.push({
                            product: payload.productId,
                            quantity: payload.quantity,
                            totalAmount: Number(payload.quantity) * product.afterDiscount
                        });
                    }
                    subTotal = data.products.reduce((a, b) => a + b.totalAmount, 0);
                    data.subTotal = subTotal;
                    data.totalAmount = subTotal - data.discount;
                }
            } else {
                subTotal = Number(payload.quantity) * product.afterDiscount;
                data = {
                    cartCode: cartCode,
                    buyer: req.authUser._id,
                    products: [{
                        product: payload.productId,
                        quantity: payload.quantity,
                        totalAmount: Number(payload.quantity) * product.afterDiscount
                    }],
                    subTotal: subTotal,
                    discount: 0,
                    totalAmount: subTotal - 0,
                    status: 'pending',
                }
            }

            let response = await cartService.updateCart(cartCode, data);
            res.json({
                result: data,
                msg: "Cart updated successfully.",
                status: true,
                meta: null
            })
        } catch (err) {
            next({ status: 400, msg: `Store Error:  ${err.message ?? err}` });
        }
    }
}

const cartController = new CartController();
module.exports = cartController;