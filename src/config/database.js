const MongoClient = require('mongodb').MongoClient;

export async function connect() {
    try {
        const url = "mongodb+srv://brann:WcLUQzsxKFkd9W@bedu-backend.kfbjk.mongodb.net";
        const client = await MongoClient.connect(url);
        const db = client.db('income-system');
        return db;
    } catch (err) {
        console.log(err);
    }
}

