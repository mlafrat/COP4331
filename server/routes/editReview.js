const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for editing a review by review_id (using query param)
    router.put("/", async (req, res) => {
        const reviewId = parseInt(req.query.review_id); // Extracting review_id from query parameter
        const updatedData = req.body;

        try {
            const existingReview = await db.collection("userReviews").findOne({ review_id: reviewId });

            if (!existingReview) {
                return res.status(404).json({ message: 'Review not found' });
            }

            // Update the review with the new data
            await db.collection("userReviews").updateOne(
                { review_id: reviewId },
                { $set: updatedData }
            );

            res.status(200).json({ message: 'Review updated successfully' });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
