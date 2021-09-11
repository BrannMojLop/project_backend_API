const mongoose = require('mongoose');

const typeUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("TypeUser", typeUserSchema);