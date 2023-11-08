const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = function (db) {
    router.post("/", async (req, res) => {
        const { username, password, email } = req.body;

        try {
            const existingUser = await db.collection("userData").findOne({ $or: [{ username }, { email }] });

            if (existingUser) {
                return res.status(400).send("User with this username or email already exists.");
            }

            const lastUser = await db.collection("userData").find().sort({ user_id: -1 }).limit(1).toArray();
            const lastUserId = lastUser.length > 0 ? lastUser[0].user_id : 0;

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Read the default profile picture file and convert it to a Buffer
            const defaultPicPath = './client/src/components/Dropdown/knightro.png';
            const profilePicData = fs.readFileSync(defaultPicPath);

            const user = {
                user_id: lastUserId + 1,
                username,
                password: hashedPassword,
                email,
                profile_pic: profilePicData // Store the default image data as a Buffer
            };

            await db.collection("userData").insertOne(user);

            // add default settings
            const defaultSettings = {
                theme: 1,
                public: false,
                user_id: lastUserId + 1
            };
            await db.collection("userSettings").insertOne(defaultSettings);

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: "Registration successful" });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
