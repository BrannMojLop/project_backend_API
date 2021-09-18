const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const sectorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Se debe indicar un titulo para el sector"],
        index: true,
        unique: true,
        match: [/^[a-zA-Z]+$/, "es inválido, solo se aceptan letras"]
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