const { Schema, model } = require('mongoose');

const sectorSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = model("Sector", sectorSchema);