const MongoClient = require('mongodb').MongoClient;

export async function connect() {
    try {
        const url = "mongodb+srv://<user>:<password>@bedu-backend.kfbjk.mongodb.net";
        const client = await MongoClient.connect(url);
        const db = client.db('income-system');
        return db;
    } catch (err) {
        console.log(err);
    }
}

