const express = require("express");
const router = express.Router();

module.exports = function(db) {

    router.get("/", async (req, res) => {
        try {
            const microwaves = await db.collection("microwaveLocations").find().toArray();
            console.log("Fetched Microwaves:", microwaves); // Log fetched microwaves

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ microwaves });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    
    return router;
};