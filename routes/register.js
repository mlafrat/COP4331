const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for handling registration
    router.post("/", async (req, res) => {
        const { username, password, email } = req.body;

        try {
            const existingUser = await db.collection("userData").findOne({ username });

            if (existingUser) {
                // User with the same username already exists
                res.status(400).send("Username already exists");
            } else {
                // Create a new user
                await db.collection("userData").insertOne({ username, password, email });
                res.send("Registration successful!");
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
