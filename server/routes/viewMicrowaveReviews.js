const express = require("express");
const router = express.Router();

module.exports = function(db) {

    router.get("/", async (req, res) => {
        const microwave_id = parseInt(req.query.microwave_id); // Ensure user_id is parsed as an integer
        console.log(microwave_id);

        try {
            const reviews = await db.collection("userReviews").find({ microwave_id }).toArray();
            console.log("Fetched Microwave Reviews:", reviews); // Log fetched reviews

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ reviews });
            //res.status(200).json( "hi, postman" );

        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    return router;
};