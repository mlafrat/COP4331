const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(db) {
    // Define a route for handling login
    router.post("/", async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await db.collection("userData").findOne({ username });

            if (user) {
                // Compare the provided password with the hashed password from the database
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (isPasswordValid) {
                    // Passwords match, handle successful login
                    res.send("Login successful!");
                } else {
                    // Passwords do not match
                    res.status(401).send("Invalid credentials");
                }
            } else {
                // User not found
                res.status(401).send("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};