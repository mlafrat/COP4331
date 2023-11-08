const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = function (db) {
    // Define a route for handling profile updates
    router.put("/:userId", async (req, res) => {
        const userId = parseInt(req.params.userId);
        const {username, password, email} = req.body;

        try {
            // Check if the user exists
            const existingUser = await db.collection("userData").findOne({user_id: userId});

            if (!existingUser) {
                return res.status(400).send("User not found.");
            }

            // Update the user's information if provided
            if (username) {
                await db.collection("userData").updateOne({user_id: userId}, {$set: {username}});
            }

            if (password) {
                // Hash the new password before storing it
                const hashedPassword = await bcrypt.hash(password, 10);
                await db.collection("userData").updateOne({user_id: userId}, {$set: {password: hashedPassword}});
            }

            if (email) {
                await db.collection("userData").updateOne({user_id: userId}, {$set: {email}});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({message: "Profile updated successfully"});

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};