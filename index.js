const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const loginRouter = require("./routes/login")
const registerRouter = require("./routes/register");

// Define the MongoDB connection string and database name
const mongoUri = "mongodb+srv://root:root@cluster0.n9pqz32.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "microwaveDatabase";

// Connect to MongoDB using MongoClient
const client = new MongoClient(mongoUri, {});
client.connect()
    .then(() => {
        const db = client.db(dbName); // Define db reference here

        app.use(express.json());

        app.get("/", (request, response) => {
            response.send("Hi there");
        });

        // Pass the MongoDB database reference to your route handlers
        app.use("/login", loginRouter(db));
        app.use("/register", registerRouter(db));

        app.listen(3000, () => {
            console.log("Listening on port 3000...");
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });
