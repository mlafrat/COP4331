const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = function (db) {
    // Define a route for handling login
    router.post("/", async (req, res) => {
        const {username, password} = req.body;

        try {
            const user = await db.collection("userData").findOne({username});

            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (isPasswordValid) {
                    res.setHeader('Content-Type', 'application/json'); // Set Content-Type header
                    res.send(JSON.stringify({message: 'Login successful', user}));
                } else {
                    res.status(401).send("Invalid credentials");
                }
            } else {
                res.status(401).send("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
