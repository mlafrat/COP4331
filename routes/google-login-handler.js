const express = require('express');
const router = express.Router();

module.exports = function(db) {
    router.get("/", async (req, res) => {
        const googleProfile = req.user;

        const existingUser = await db.collection("userData").findOne({ email: googleProfile.emails[0].value });

        if (existingUser) {
            // User with the same email already exists, redirect to dashboard
            const user = {
                user_id: existingUser.user_id,
                username: existingUser.username,
                email: existingUser.email,
                googleProfileImage: googleProfile.photos && googleProfile.photos.length > 0 ? googleProfile.photos[0].value : null
            };

            // Set user data in a cookie
            res.cookie('user', JSON.stringify(user), { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Expires in 7 days

            res.redirect('http://localhost:3000/dashboard');
        } else {
            // User is not in the database, proceed with insertion
            const lastUser = await db.collection("userData").find().sort({ user_id: -1 }).limit(1).toArray();
            const lastUserId = lastUser.length > 0 ? lastUser[0].user_id : 0;
            const user_id = lastUserId + 1;

            const user = {
                user_id: user_id,
                username: googleProfile.displayName,
                email: googleProfile.emails[0].value,
                googleProfileImage: googleProfile.photos && googleProfile.photos.length > 0 ? googleProfile.photos[0].value : null
            };

            await db.collection("userData").insertOne(user);

            const defaultSettings = {
                theme: 1,
                public: false,
                user_id: user_id
            };
            await db.collection("userSettings").insertOne(defaultSettings);

            // Set user data in a cookie
            res.cookie('user', JSON.stringify(user), { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Expires in 7 days

            res.redirect('http://localhost:3000/dashboard');
        }
    });

    return router;
};
