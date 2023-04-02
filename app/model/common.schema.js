const { default: mongoose } = require("mongoose");

const CommonSchema = {
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
}

module.exports = CommonSchema;