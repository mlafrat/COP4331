const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for adding reviews
    router.post("/", async (req, res) => {
        const { review, microwave_id, user_id, is_rated, rating } = req.body;

        try {
            // Find the last review and extract its review_id
            const lastReview = await db.collection("userReviews").find().sort({ review_id: -1 }).limit(1).toArray();
            const lastReviewId = lastReview.length > 0 ? lastReview[0].review_id : 0;

            const existingMicrowave = await db.collection("microwaveLocations").findOne({ microwave_id });

            if (is_rated) {
                await db.collection("microwaveLocations").updateOne(
                    { microwave_id },
                    {
                        $set: {
                            total_rating: existingMicrowave.total_rating + rating,
                            users_rated: existingMicrowave.users_rated + 1
                        },
                    }
                );
            }

            const newReview = {
                review_id: lastReviewId + 1, // Incrementing the last review's ID
                review,
                microwave_id,
                user_id,
                is_rated,
                rating: is_rated ? rating : 0
            };

            await db.collection("userReviews").insertOne(newReview);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ message: "New review successful!" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
