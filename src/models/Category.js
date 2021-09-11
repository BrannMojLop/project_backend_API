const mongoose = require('mongoose');

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
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema);