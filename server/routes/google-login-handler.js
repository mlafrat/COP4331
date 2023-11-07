const express = require('express');
const router = express.Router();

module.exports = function(db) {
    router.get("/", async (req, res) => {
        const googleProfile = req.user;

        const existingUser = await db.collection("userData").findOne({ email: googleProfile.emails[0].value });

        if (existingUser) {
            // User with the same email already exists, redirect to dashboard
            res.redirect('http://localhost:3000/dashboard');
        } else {
            // User is not in the database, proceed with insertion
            const lastUser = await db.collection("userData").find().sort({ user_id: -1 }).limit(1).toArray();
            const lastUserId = lastUser.length > 0 ? lastUser[0].user_id : 0;
            const user_id = lastUserId + 1;

            const user = {
                user_id: user_id,
                username: googleProfile.displayName,
                email: googleProfile.emails[0].value
            };

            await db.collection("userData").insertOne(user);

            const defaultSettings = {
                theme: 1,
                public: false,
                user_id: user_id
            };
            await db.collection("userSettings").insertOne(defaultSettings);

            res.redirect('http://localhost:3000/dashboard');
        }
    });

    return router;
};