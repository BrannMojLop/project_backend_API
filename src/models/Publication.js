const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id_product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true
    },
    prices: {
        type: Array,
        required: true
    },
    periods: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    max_distance: {
        type: Number,
        required: true
    },
    finished_at: {
        type: Date
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Publication", publicationSchema);