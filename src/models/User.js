const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;


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

userSchema.methods.createPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 100000, 512, "sha512")
        .toString("hex");
};

userSchema.methods.validationPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
    return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date();
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

userSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};


userSchema.plugin(uniqueValidator, { message: "El email ya existe" });
userSchema.plugin(uniqueValidator, { message: "El username ya existe" });
module.exports = mongoose.model("User", userSchema);