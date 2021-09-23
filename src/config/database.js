const mongoose = require('mongoose');

export async function connect() {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI_DEV);
        console.log(db);
        return db;
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;