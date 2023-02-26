const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    //Table definition
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    image: {
        type: String,
        default: null,
    },
    link: {
        type: String,
        default: null,
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

const BannerModel = mongoose.model('Banner', BannerSchema);
module.exports = BannerModel;