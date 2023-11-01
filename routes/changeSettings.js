const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for changing user settings
    router.post("/", async (req, res) => {
        const { theme, public, user_id } = req.body;

        try {
            res.setHeader('Content-Type', 'application/json');
            await db.collection("userSettings").updateOne(
                { user_id },
                {
                    $set: { theme: theme, public: public },
                }                    
            );

            res.send("Settings update successful!");

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
