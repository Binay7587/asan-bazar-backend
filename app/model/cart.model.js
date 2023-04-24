const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    //Table definition
    cartCode: {
        type: String,
        required: true,
        unique: true,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        }
    }],
    subTotal: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'delivered'],
        default: 'pending',
    },
    orderDate: {
        type: Date,
        default: null,
    }
}, {
    autoIndex: true,
    autoCreate: true,
    timestamps: true,
});

const CartModel = mongoose.model('Cart', CartSchema);
module.exports = CartModel;