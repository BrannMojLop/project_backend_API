const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    id_rentalRequest: {
        type: mongoose.Types.ObjectId,
        ref: "RentalRequest",
        required: true,
        unique: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    start_date: {
        type: Date,
        required: true,
        default: new Date()
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Rent", rentSchema);
