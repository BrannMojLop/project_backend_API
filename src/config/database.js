const mongoose = require('mongoose');

export async function connect() {
    try {
        const uri = "mongodb+srv://brann:sbaSIEr2SHs7VPw7@bedu-backend.kfbjk.mongodb.net/income-system?retryWrites=true&w=majority"
        const db = await mongoose.connect(uri);
        console.log(db);
        return db;
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;