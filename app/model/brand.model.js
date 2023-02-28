const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    //Table definition
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    brandImage: {
        type: String,
        default: null,
    },
    slug: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }
}, {
    autoIndex: true,
    timestamps: true,
});

const BrandModel = mongoose.model('Brand', BrandSchema);
module.exports = BrandModel;