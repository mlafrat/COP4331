const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for adding reviews
    router.post("/", async (req, res) => {
        const { review, is_photo_attached, microwave_id, user_id, is_rated, rating } = req.body;
        //to-do: picture

        try {

            const existingMicrowave = await db.collection("microwaveLocations").findOne({ microwave_id });

            //update rating of microwave
            if(is_rated) { 
                await db.collection("microwaveLocations").updateOne(
                    { microwave_id },
                    {
                        $set: { total_rating: existingMicrowave.total_rating + rating,
                                users_rated: existingMicrowave.users_rated + 1 },
                    }                    
                );  
            }

            //add a new photo
            if(is_photo_attached) {
                const lastPhoto = await db.collection("microwavePhotos").find().sort({ photo_id: -1 }).limit(1).toArray();
                const lastPhotoId = lastPhoto.length > 0 ? lastPhoto[0].photo_id : 0;

                const newPhoto = {
                    creator_user_id: user_id, 
                    microwave_id: microwave_id,
                    photo_id: lastPhotoId + 1   
                    //to-do: file location/name of photo generation               
                };

                await db.collection("microwavePhotos").insertOne(newPhoto);
            }

            const newRating = is_rated ? rating : 0;

            const newReview = {
                review, 
                is_photo_attached, 
                microwave_id, 
                user_id, 
                is_rated, 
                rating: newRating
            };

            await db.collection("userReviews").insertOne(newReview);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({message:"New review successful!"});
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
