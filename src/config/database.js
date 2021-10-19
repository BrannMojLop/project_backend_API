const mongoose = require('mongoose');

export async function connect(res) {
    try {
        const db = await mongoose.connect("mongodb+srv://brann:brandonmojica18@bedu-backend.kfbjk.mongodb.net/income-system-prod?retryWrites=true&w=majority", {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        });
        return db;
    } catch (e) {
        return res.status(422).send(err)
    }

}

module.exports = connect;
