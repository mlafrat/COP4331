const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for handling registration
    router.post("/", async (req, res) => {
        const { creator_user_id, gps_lat, gps_long } = req.body;

        try {

            const lastMicrowave = await db.collection("microwaveLocations").find().sort({ microwave_id: -1 }).limit(1).toArray();
            const lastMicrowaveId = lastMicrowave.length > 0 ? lastMicrowave[0].microwave_id : 0;

            const microwave = {
                creator_user_id,
                gps_lat,
                gps_long,
                total_rating: 0,
                users_rated: 0,
                microwave_id: lastMicrowaveId + 1
            };

            await db.collection("microwaveLocations").insertOne(microwave);
            
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({message:"New microwave successful!"});

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};