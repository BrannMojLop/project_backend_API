const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

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
        required: true,
        default: true
    }
}, { timestamps: true })

periodSchema.plugin(uniqueValidator, { message: "El periodo ya existe" });
module.exports = mongoose.model("Period", periodSchema);