const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for handling login
    router.post("/", async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await db.collection("userData").findOne({ username, password });

            if (user) {
                // User found, handle successful login
                res.send("Login successful!");
            } else {
                // User not found or password incorrect
                res.status(401).send("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
