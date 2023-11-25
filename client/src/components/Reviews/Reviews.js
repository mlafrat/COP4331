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
import StarRating from './StarRating';
import './Reviews.css';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [editedRating, setEditedRating] = useState(0);
    const [microwaveNames, setMicrowaveNames] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

    const fetchMicrowaveName = async (microwaveId) => {
        try {
            const response = await fetch(`${apiUrl}/getMicrowaveName?microwave_id=${microwaveId}`);
            const data = await response.json();
            if (data && data.microwave_name) {
                setMicrowaveNames((prevNames) => ({
                    ...prevNames,
                    [microwaveId]: data.microwave_name,
                }));
            } else {
                console.error(`No microwave name found for microwave ID ${microwaveId}`);
            }
        } catch (error) {
            console.error('Error fetching microwave name:', error);
        }
    };

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
        const confirmation = window.confirm('Are you sure you want to delete this review?');
        if (confirmation) {
            try {
                await fetch(`${apiUrl}/deleteReview?review_id=${reviewId}`, {
                    method: 'DELETE',
                });
                const updatedReviews = [...reviews];
                updatedReviews.splice(index, 1);
                setReviews(updatedReviews);
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    const handleSave = async (reviewId, index) => {
        try {
            const updatedReviewText = reviews[index].review;
            
            await fetch(`${apiUrl}/editReview?review_id=${reviewId}`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({review: updatedReviewText, rating: editedRating}),
            });
            const updatedReviews = [...reviews];
            updatedReviews[index].isEditing = false;
            updatedReviews[index].review = updatedReviewText;
            updatedReviews[index].rating = editedRating; 
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
                    const response = await fetch(`${apiUrl}/viewReviews?user_id=${extractedUserId}`);
                    const data = await response.json();
                    initializeReviews(data.reviews);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Fetch microwave name for each review's microwave_id
        reviews.forEach((review) => {
            if (!microwaveNames[review.microwave_id]) {
                fetchMicrowaveName(review.microwave_id)
                    .catch((error) => {
                        console.error(`Error fetching microwave name for microwave_id ${review.microwave_id}:`, error);
                    });
            }
        });
    }, [reviews, microwaveNames]);

    return (
        <div className="review-wrapper">
            <h2 style={{ padding: '10px' }}>My Reviews</h2>
            <Box
                sx={{
                    overflowY: 'scroll',
                    scrollbarWidth: 'auto',
                    webkitOverflowScrolling: 'scroll', // Show scrollbar in Webkit browsers
                }}
            >
                <Grid container spacing={3} columns={{ xs: 12, sm: 6, md: 4 }} sx={{ justifyContent: 'center' }}>
                    {reviews.map((review, index) => (
                        <Grid item key={index}>
                            <Card>
                                <CardContent sx={{display:'block'}}>
                                    <div className="subtitle">
                                        <p style={{fontWeight:'700', textAlign:'center'}}>Microwave Location: </p>
                                        <p style={{textAlign:'center'}}>{microwaveNames[review.microwave_id]}</p>
                                    </div>
                                    <div className="review-text">
                                        <p style={{fontWeight:'700', textAlign:'center'}}>You Wrote: </p>
                                        {review.isEditing ? (
                                            <>
                                                <textarea
                                                    className="text-box"
                                                    value={review.review}
                                                    onChange={(e) => {
                                                        const updatedReviews = [...reviews];
                                                        updatedReviews[index].review = e.target.value;
                                                        setReviews(updatedReviews);
                                                    }}
                                                    rows={4}
                                                    cols={40}
                                                />
                                                <div className="star-rating-container">
                                                    <StarRating
                                                        className="star-rating"
                                                        rating={editedRating || review.rating}
                                                        onRate={(newRating) => setEditedRating(newRating)}
                                                    />
                                                </div>

                                            </>
                                        ) : (
                                            <p style={{inlineSize:'350px', textAlign:'center', paddingLeft:'0px'}}>{review.review}</p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardActions sx={{justifyContent:'center'}}>
                                    <Button startIcon={<StarRateIcon />}>
                                        {`${review.rating || 0} Stars`}
                                    </Button>
                                    {review.isEditing ? (
                                        <Button variant="contained" onClick={() => handleSave(review.review_id, index)}>Save</Button>
                                    ) : (
                                        <>
                                            <Button variant="contained" startIcon={<EditIcon />} onClick={() => handleEdit(index)}>
                                                Edit
                                            </Button>
                                            <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => handleDelete(review.review_id, index)}>
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

