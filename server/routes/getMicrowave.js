const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for getting a single microwave 
    router.get("/", async (req, res) => {
        const microwave_id = parseInt(req.query.microwave_id);

        try {
            const microwave = await db.collection("microwaveLocations").findOne({ microwave_id: microwave_id });

            if (!microwave) {
                return res.status(404).json({ message: 'Microwave not found' });
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(microwave);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
