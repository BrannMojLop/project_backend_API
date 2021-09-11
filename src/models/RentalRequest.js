const mongoose = require('mongoose');

const rentalRequestSchema = new mongoose.Schema({
    id_lessee: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    id_lessor: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    id_publication: {
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
        type: Object,
        required: true,
        default: {
            "status": "En Espera",
            "ref": 1
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("RentalRequest", rentalRequestSchema);