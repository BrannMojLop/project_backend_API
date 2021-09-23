const mongoose = require('mongoose');

export async function connect() {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        });
        return db;
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;