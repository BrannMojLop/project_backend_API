const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

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
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: Object,
        required: true,
        default: {
            "status": "Activa",
            "ref": 1
        }
    }
}, { timestamps: true })

rentSchema.plugin(uniqueValidator, { message: "La solicitud de renta ya fue aceptada" });
module.exports = mongoose.model("Rent", rentSchema);
