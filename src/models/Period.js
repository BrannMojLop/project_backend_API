const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    days: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Period", periodSchema);