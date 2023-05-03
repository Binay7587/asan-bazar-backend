const CartModel = require("../model/cart.model");
const Joi = require("joi");
const productService = require("./product.service");

class CartService {
    // Get cart by cartCode
    getCartByCartCode = async (cartCode) => {
        try {
            return await CartModel.findOne({ cartCode }).lean();
        } catch (err) {
            throw err;
        }
    }

    // Update cart
    updateCart = async (cartCode, data) => {
        try {
            return await CartModel.updateOne({ cartCode }, { $set: data }, { upsert: true });
        } catch (err) {
            throw err;
        }
    }

    // Delete cart
    deleteById = async (cartCode) => {
        try {
            return await CartModel.deleteOne({ cartCode });
        } catch (err) {
            throw err;
        }
    }

    setCartDetail = async (products) => {
        try {
            let productIds = products.map(item => item.productId); // [productId, productId, productId]
            let productInfo = await productService.getProductsByIds(productIds); // [{productId, title, price, afterDiscount}]
            let cartDetail = [];  // [{productId, title, price, amount, quantity}]

            productInfo.forEach(product => {
                products.forEach(item => {
                    if (item.productId == product._id) {
                        cartDetail.push({
                            productId: product._id,
                            title: product.title,
                            productImage: product.productImage[0] ?? null,
                            price: product.price,
                            discount: product.discount,
                            afterDiscount: product.afterDiscount,
                            amount: product.afterDiscount * item.quantity,
                            quantity: item.quantity
                        });
                    }
                });
            });

            return cartDetail;
        } catch (err) {
            throw err;
        }
    }
}

const cartService = new CartService();
module.exports = cartService;