const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for deleting a review by review_id
    router.delete("/", async (req, res) => {
        const reviewId = parseInt(req.query.review_id); // Extracting review_id from query parameter

        try {
            const existingReview = await db.collection("userReviews").findOne({ review_id: reviewId });

            if (!existingReview) {
                return res.status(404).json({ message: 'Review not found' });
            }

            // Delete the review based on the review_id
            await db.collection("userReviews").deleteOne({ review_id: reviewId });

            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
