const mongoose = require('mongoose');

export async function connect(res) {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        });
        return db;
    } catch (e) {
        return res.status(422).send(err)
    }

}

module.exports = connect;