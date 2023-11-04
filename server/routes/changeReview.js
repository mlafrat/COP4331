const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for updating reviews
    router.post("/", async (req, res) => {
        const { review, is_photo_attached, microwave_id, user_id, is_rated, rating } = req.body;
        //to-do: picture

        try {
            const existingMicrowave = await db.collection("microwaveLocations").findOne({ microwave_id });
            const existingReview = await db.collection("userReviews").findOne({ user_id, microwave_id });

            //Tragically long photo logic here
            //Needs to search by microwaveid, creator_user_id = userid
            const existingPhoto = await db.collection("microwavePhotos").findOne({ user_id, microwave_id });

            if(is_photo_attached && existingPhoto) {
                //change picture
                //to-do: check if it's the same picture
                await db.collection("microwavePhotos").updateOne(
                    { user_id, microwave_id },
                    {
                        $set: {  }, //to-do: change location
                    }                    
                );  
            }
            else if(is_photo_attached) {
                //add new picture
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
            else if(existingPhoto) {
                //to-do: delete picture
                await db.collection("microwavePhotos").updateOne(
                    { user_id, microwave_id },
                    {
                        $set: { location: "" }, //to-do: change location
                    }                    
                );  
            }

            //Rating logic here

            if(rating != existingReview.rating) {
                //update rating
                if(is_rated){
                    await db.collection("microwaveLocations").updateOne(
                        { microwave_id },
                        {
                            $set: { total_rating: existingMicrowave.total_rating + rating - existingReview.rating },
                        }                    
                    );  
                }
                //delete rating
                else {
                    await db.collection("microwaveLocations").updateOne(
                        { microwave_id },
                        {
                            $set: { total_rating: existingMicrowave.total_rating - existingReview.rating,
                                    users_rated: existingMicrowave.users_rated - 1},
                        }                    
                    );  
                }
            }

            //update review
            await db.collection("userReviews").updateOne(
                { microwave_id, user_id },
                {
                    $set: { review: review, is_photo_attached: is_photo_attached, microwave_id: microwave_id,
                            user_id: user_id, is_rated: is_rated, rating: rating },
                }                    
            );  

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({message:"Update review successful!"});
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
