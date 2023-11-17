const express = require("express");
const router = express.Router();

module.exports = function(db) {
    // Define a route for updating reviews
    router.put("/:user_id", async (req, res) => {
        const user_id = parseInt(req.params.user_id);
        const { review, rating, microwave_id } = req.body;

        try {
            const existingMicrowave = await db.collection("microwaveLocations").findOne({ microwave_id });
            const existingReview = await db.collection("userReviews").findOne({ user_id, microwave_id });

            
            console.log("user id:", user_id); 
            console.log("review:", review); 
            console.log("rating:", rating); 
            console.log("microwave id:", microwave_id); 
            console.log("existing review:", existingReview); 


            /*
            console.log('passed rating:')
            console.log(rating)
            console.log('existing rating:')
            console.log(existingReview.rating)
*/
/*
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
*/

            //update review
            await db.collection("userReviews").updateOne(
                { microwave_id, user_id },
                {
                    $set: { review: review, microwave_id: microwave_id,
                            user_id: user_id, rating: rating },
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
