const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const sectorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "no puede estar vacio"],
        index: true,
        unique: true
    },
    description: String,
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

sectorSchema.plugin(uniqueValidator, { message: "Ya existe un sector con este nombre" });
module.exports = mongoose.model("Sector", sectorSchema);