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

            // update total rating 
            const microwaveId = existingReview.microwave_id;
            const rating = existingReview.rating;

            const existingMicrowave = await db.collection("microwaveLocations").findOne({ microwave_id: microwaveId });
            await db.collection("microwaveLocations").updateOne(
                { microwave_id: microwaveId },
                {
                    $set: {
                        total_rating: existingMicrowave.total_rating - rating,
                        users_rated: existingMicrowave.users_rated - 1
                    },
                }
            );            

            // Delete the review based on the review_id
            await db.collection("userReviews").deleteOne({ review_id: reviewId });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
