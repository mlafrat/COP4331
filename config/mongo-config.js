const { MongoClient } = require('mongodb');

const mongoUri = "mongodb+srv://root:root@cluster0.n9pqz32.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "microwaveDatabase";

const client = new MongoClient(mongoUri);

async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectToMongo;
