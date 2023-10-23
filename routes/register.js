const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for handling registration
    router.post("/", async (req, res) => {
        const { username, password, email } = req.body;

        try {
            const existingUser = await db.collection("userData").findOne({ $or: [{ username }, { email }] });

            if (existingUser) {
                return res.status(400).send("User with this username or email already exists.");
            }

            const lastUser = await db.collection("userData").find().sort({ user_id: -1 }).limit(1).toArray();
            const lastUserId = lastUser.length > 0 ? lastUser[0].user_id : 0;

            const user = {
                user_id: lastUserId + 1,
                username,
                password,
                email
            };

            await db.collection("userData").insertOne(user);
            res.send("Registration successful!");
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
