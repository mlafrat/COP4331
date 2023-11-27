const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for getting microwave name by microwaveId (using query param)
    router.get("/", async (req, res) => {
        const microwave_id = req.query.microwave_id;
        try {
            // Assuming your collection name for microwaves is "microwaveLocations"
            const microwave = await db.collection("microwaveLocations").findOne({ microwave_id: parseInt(microwave_id) });

            if (!microwave) {
                return res.status(404).json({ message: 'Microwave not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ microwave_name: microwave.location_building });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
