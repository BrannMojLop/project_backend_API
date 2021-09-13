const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    id_sector: {
        type: mongoose.Types.ObjectId,
        ref: "Sector",
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

categorySchema.plugin(uniqueValidator, { message: "La categoria ya existe" });
module.exports = mongoose.model("Category", categorySchema);