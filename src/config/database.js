const MongoClient = require('mongodb').MongoClient;

export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('income-system');
        return db;
    } catch (err) {
        console.log(err);
    }
}

