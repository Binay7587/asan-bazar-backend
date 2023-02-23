const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    district: String,
    municipality: String,
    street: String,
    houseNumber: String,
    postcode: String,
});

const UserSchema = new mongoose.Schema({
    //Table definition
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    address: {
        temp: AddressSchema,
        perm: AddressSchema,
    },
    phone: {
        type: String,
        required: true,
        // RegExp: /^\d{10}$/,
        minlength: 10,
        maxlength: 15,
    },
    userImage: {
        type: String,
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }
}, {
    //Table options
    autoIndex: true,
    autoCreate: true,
    timestamps: true,
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;