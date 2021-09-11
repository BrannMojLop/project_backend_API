const mongoose = require('mongoose');

const rentalRequestSchema = new mongoose.Schema({
    id_lessee: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    id_publicacion: {
        type: mongoose.Types.ObjectId,
        ref: "Publication",
        required: true,
        unique: true
    },
    contract: {
        type: Object,
        required: true
    },
    answer: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("RentalRequest", rentalRequestSchema);