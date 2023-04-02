const mongoose = require('mongoose');
const CommonSchema = require('./common.schema');

const CategorySchema = new mongoose.Schema({
    //Table definition
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 300,
    },
    categoryImage: {
        type: String,
        default: null,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    status: CommonSchema.status,
    createdBy: CommonSchema.createdBy,
}, {
    autoIndex: true,
    autoCreate: true,
    timestamps: true,
});

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;