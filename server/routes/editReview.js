const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for editing a review by review_id (using query param)
    router.put("/", async (req, res) => {
        const reviewId = parseInt(req.query.review_id); // Extracting review_id from query parameter
        const updatedData = req.body;

        try {
            const existingReview = await db.collection("userReviews").findOne({ review_id: reviewId });
            console.log(existingReview.review_id);
            if (!existingReview) {
                return res.status(404).json({ message: 'Review not found' });
            }

            // Update the review with the new data
            await db.collection("userReviews").updateOne(
                { review_id: reviewId },
                { $set: updatedData }
            );

            // update total rating 
            const microwaveId = updatedData.microwave_id;
            const rating = updatedData.rating;

            const existingMicrowave = await db.collection("microwaveLocations").findOne({ microwave_id: microwaveId });
            await db.collection("microwaveLocations").updateOne(
                { microwave_id: microwaveId },
                {
                    $set: {
                        total_rating: existingMicrowave.total_rating + rating,
                        users_rated: existingMicrowave.users_rated + 1
                    },
                }
            );

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: 'Review updated successfully' });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
