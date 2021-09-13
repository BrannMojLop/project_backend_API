const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const typeUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

typeUserSchema.plugin(uniqueValidator, { message: "El tipo de usuario ya existe" });
module.exports = mongoose.model("TypeUser", typeUserSchema);