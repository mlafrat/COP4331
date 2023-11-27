const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for getting a username by user_id (using query param)
    router.get("/", async (req, res) => {
        const userId = parseInt(req.query.user_id);

        try {
            const user = await db.collection("userData").findOne({ user_id: userId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ username: user.username });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
