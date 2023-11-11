const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for adding to microwavePhoto, just location text for now
    router.put("/:userId", async (req, res) => {
        const userId = parseInt(req.params.userId);
        const { location } = req.body;

        try {

            const lastMicrowave = await db.collection("microwaveLocations").find().sort({ microwave_id: -1 }).limit(1).toArray();
            const lastMicrowaveId = lastMicrowave.length > 0 ? lastMicrowave[0].microwave_id : 0;

            const microwave = {
                creator_user_id: userId,
                microwave_id: lastMicrowaveId + 1,
                photo_id: 1, // first photo for microwave
                location: location
            };

            await db.collection("microwavePhotos").insertOne(microwave);
            
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({message:"New microwave successful!"});

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};