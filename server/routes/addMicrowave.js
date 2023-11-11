const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for adding microwaves
    router.put("/:userId", async (req, res) => {
        const userId = parseInt(req.params.userId);
        const { location_building, location_description } = req.body;
        //would also need to get gps_lat, gps_long 

        try {

            const lastMicrowave = await db.collection("microwaveLocations").find().sort({ microwave_id: -1 }).limit(1).toArray();
            const lastMicrowaveId = lastMicrowave.length > 0 ? lastMicrowave[0].microwave_id : 0;

            //commenting out gps stuff for now
            const microwave = {
                creator_user_id: userId,
                //gps_lat,
                //gps_long,
                total_rating: 0,
                users_rated: 0,
                microwave_id: lastMicrowaveId + 1,
                location_building: location_building,
                location_description: location_description
            };

            await db.collection("microwaveLocations").insertOne(microwave);

            //would need to have a flag for if there's a picture
            //and take care of that here
            
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({message:"New microwave successful!"});

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};