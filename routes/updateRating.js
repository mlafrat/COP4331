const express = require("express");
const router = express.Router();

module.exports = function(db) {

// Define a route for updating overall rating

router.put("/", async (req, res) => {
    const { rating, microwave_id } = req.body;
        try {

            const microwaveId = parseInt(microwave_id)           
            const existingMicrowave = await db.collection("microwaveLocations").findOne({ microwave_id: microwaveId });

            
            await db.collection("microwaveLocations").updateOne(
                { microwave_id: microwaveId },
                {
                    $set: {
                        total_rating: existingMicrowave.total_rating + rating,
                        users_rated: existingMicrowave.users_rated + 1
                    },
                }
            );
            

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ existingMicrowave });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
