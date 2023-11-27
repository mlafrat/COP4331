const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for viewing reviews

    // this is for the frontend connection
    //router.get("/:userId", async (req, res) => {
    //const user_id = parseInt(req.params.userId);

    // this is for easy testing in postman
    router.get("/", async (req, res) => {
        const user_id = parseInt(req.query.user_id); // Ensure user_id is parsed as an integer

        try {
            const reviews = await db.collection("userReviews").find({ user_id }).toArray();
            //console.log("Fetched Reviews:", reviews); // Log fetched reviews

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ reviews });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    return router;
};