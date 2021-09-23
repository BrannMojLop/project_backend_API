const mongoose = require('mongoose');

export async function connect() {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        });
        return db;
    }
}

module.exports = connect;
