import './Reviews.css'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StarRateIcon from '@mui/icons-material/StarRate';
import EditReview from '../EditReview/EditReview';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState(null); // State to store user_id from cookie

    useEffect(() => {
        const fetchData = async () => {
            // Retrieve user_id from cookie
            const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
            const extractedUserId = userData ? userData.user_id : null;
            console.log(extractedUserId);

            if (extractedUserId) {
                setUserId(extractedUserId);

                try {
                    const response = await fetch(`http://localhost:3001/viewReviews?user_id=${extractedUserId}`);
                    const data = await response.json();
                    setReviews(data.reviews);
                    console.log(data.reviews);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            }
        };

        fetchData();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="review-wrapper">
            <h2>My Reviews</h2>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={{ xs: 12, sm: 6, md: 4 }}>
                    {reviews.map((review, index) => (
                        <Grid item key={index}>
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        Building Location
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {review.microwave_location}
                                    </Typography>
                                    <Typography variant="body2">
                                        {review.review}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" startIcon={<StarRateIcon />} onClick={handleClickOpen}>
                                        {`${review.rating} Stars - reviewer's rating`}
                                    </Button>
                                    <EditReview open={open} thisMicrowave = {review} microwaveId = {review.microwave_id} onClose={handleClose} />
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
