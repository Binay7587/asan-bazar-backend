const mongoose = require('mongoose');
const CommonSchema = require('./common.schema');

const ProductSchema = new mongoose.Schema({
    //Table definition
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 300,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    categoryId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        default: null,
    }],
    description: String,
    price: {
        type: Number,
        min: 0,
        required: true
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    afterDiscount: {
        type: Number,
        min: 0,
        required: true
    },
    productImage: [{
        type: String,
        default: null,
    }],
    featured: {
        type: Boolean,
        default: false,
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'Brand',
        default: null,
    },
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    status: CommonSchema.status,
    createdBy: CommonSchema.createdBy,
}, {
    autoIndex: true,
    autoCreate: true,
    timestamps: true,
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;