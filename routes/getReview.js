const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for getting a single review by review_id (using query param)
    router.get("/", async (req, res) => {
        const reviewId = parseInt(req.query.review_id);

        try {
            const review = await db.collection("userReviews").findOne({ review_id: reviewId });

            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }

            res.status(200).json(review);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
