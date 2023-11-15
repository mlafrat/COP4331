const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage without a service account key
const storage = new Storage({
    keyFilename: 'knightrowave-ab29af5b421a.json',
});
const bucket = storage.bucket('knightrowave-profile-pics');

// Multer middleware setup for handling file uploads
const upload = multer({
    storage: multer.memoryStorage(), // Store the file in memory
});

module.exports = function (db) {
    // Define a route for handling profile updates
    router.put("/:userId", upload.single('profilePic'), async (req, res) => {
        const userId = parseInt(req.params.userId);
        const { username, password, email } = req.body;

        try {
            // Check if the user exists
            const existingUser = await db.collection("userData").findOne({ user_id: userId });

            if (!existingUser) {
                return res.status(400).send("User not found.");
            }

            // Update the user's information if provided
            if (username) {
                await db.collection("userData").updateOne({ user_id: userId }, { $set: { username } });
            }

            if (password) {
                // Hash the new password before storing it
                const hashedPassword = await bcrypt.hash(password, 10);
                await db.collection("userData").updateOne({ user_id: userId }, { $set: { password: hashedPassword } });
            }

            if (email) {
                await db.collection("userData").updateOne({ user_id: userId }, { $set: { email } });
            }

            // Handle profile picture upload
            if (req.file) {
                const profilePicFileName = `${userId}_${Date.now()}_${req.file.originalname}`;
                const profilePicFile = bucket.file(profilePicFileName);

                // Upload the file to Google Cloud Storage
                await profilePicFile.save(req.file.buffer, { public: true });

                // Set the public URL for the file in the user's profile
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${profilePicFileName}`;
                await db.collection("userData").updateOne({ user_id: userId }, { $set: { profilePicUrl: publicUrl } });
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: "Profile updated successfully" });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};