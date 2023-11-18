import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import StarRateIcon from '@mui/icons-material/StarRate';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarRating from './StarRating'; // Assuming StarRating is in a separate file

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [editedRating, setEditedRating] = useState(0);

    const initializeReviews = (reviewData) => {
        const reviewsWithFlags = reviewData.map((review) => ({
            ...review, isEditing: false,
        }));
        setReviews(reviewsWithFlags);
    };

    const handleEdit = (index) => {
        const updatedReviews = [...reviews];
        updatedReviews[index].isEditing = true;
        setEditedRating(updatedReviews[index].rating || 0); // Set edited rating to the current rating
        setReviews(updatedReviews);
    };

    const handleDelete = async (reviewId, index) => {
        try {
            // Fetch call to delete a review by its ID
            await fetch(`http://localhost:3001/deleteReview?review_id=${reviewId}`, {
                method: 'DELETE',
            });
            const updatedReviews = [...reviews];
            updatedReviews.splice(index, 1);
            setReviews(updatedReviews);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleSave = async (reviewId, index) => {
        try {
            const updatedReviewText = reviews[index].review;
            // Assuming the API endpoint for updating review text and rating is '/editReview'
            await fetch(`http://localhost:3001/editReview?review_id=${reviewId}`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({review: updatedReviewText, rating: editedRating}),
            });
            const updatedReviews = [...reviews];
            updatedReviews[index].isEditing = false;
            updatedReviews[index].review = updatedReviewText;
            updatedReviews[index].rating = editedRating; // Update the rating
            setReviews(updatedReviews);
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
            const extractedUserId = userData ? userData.user_id : null;

            if (extractedUserId) {
                try {
                    // Fetch call to get reviews by user ID
                    const response = await fetch(`http://localhost:3001/viewReviews?user_id=${extractedUserId}`);
                    const data = await response.json();
                    initializeReviews(data.reviews);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div className="review-wrapper">
            <h2>My Reviews</h2>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={{ xs: 12, sm: 6, md: 4 }}>
                    {reviews.map((review, index) => (
                        <Grid item key={index}>
                            <Card>
                                <CardContent>
                                    <div className="subtitle">
                                        Microwave Location: {review.microwave_id}
                                    </div>
                                    <div className="review-text">
                                        {review.isEditing ? (
                                            <>
                                                <textarea
                                                    value={review.review}
                                                    onChange={(e) => {
                                                        const updatedReviews = [...reviews];
                                                        updatedReviews[index].review = e.target.value;
                                                        setReviews(updatedReviews);
                                                    }}
                                                    rows={4}
                                                    cols={40}
                                                />
                                                <div>
                                                    <StarRating
                                                        rating={editedRating || review.rating}
                                                        onRate={(newRating) => setEditedRating(newRating)}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <p>{review.review}</p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" startIcon={<StarRateIcon />}>
                                        {`${review.rating || 0} Stars - reviewer's rating`}
                                    </Button>
                                    {review.isEditing ? (
                                        <Button onClick={() => handleSave(review.review_id, index)}>Save</Button>
                                    ) : (
                                        <>
                                            <Button startIcon={<EditIcon />} onClick={() => handleEdit(index)}>
                                                Edit
                                            </Button>
                                            <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(review.review_id, index)}>
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Reviews;

