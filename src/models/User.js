const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    id_type: {
        type: mongoose.Types.ObjectId,
        ref: "TypeUser",
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

userSchema.methods.publicData = () => {
    return {
        id: this.id,
        username: this.username,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

module.exports = mongoose.model("User", userSchema);