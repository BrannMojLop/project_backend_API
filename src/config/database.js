const mongoose = require('mongoose');

export async function connect() {
    try {
        const db = await mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
        return db;
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;
