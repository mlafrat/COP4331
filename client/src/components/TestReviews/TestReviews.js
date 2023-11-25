import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Box, Stack } from "@mui/material";
import './TestReviews.css';

function TestReviews() {
    const microwave_id = window.location.hash.substring(1);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

    const [reviews, setReviews] = useState([]);
    const [microwaveName, setMicrowaveName] = useState();
    const [microwaveDescrip, setMicrowaveDescrip] = useState();

    useEffect(() => {
        const fetchData = async () => {
            if (microwave_id) {
                try {
                    const response = await fetch(`${apiUrl}/viewMicrowaveReviews?microwave_id=${microwave_id}`);
                    const data = await response.json();
                    initializeReviews(data.reviews);

                    const microwaveNameResponse = await fetch(`${apiUrl}/getMicrowaveName?microwave_id=${microwave_id}`);
                    const microwaveNameData = await microwaveNameResponse.json();
                    setMicrowaveName(microwaveNameData.microwave_name);

                    const microwaveDescripResponse = await fetch(`${apiUrl}/getMicrowaveDescrip?microwave_id=${microwave_id}`);
                    const microwaveDescripData = await microwaveDescripResponse.json();
                    setMicrowaveDescrip(microwaveDescripData.microwave_descrip);

                    const reviewsWithUsernames = await Promise.all(
                        data.reviews.map(async (review) => {
                            console.log(review.user_id);
                            const userResponse = await fetch(`${apiUrl}/getUsernames?user_id=${review.user_id}`);
                            const userData = await userResponse.json();
                            console.log(userData.username);
                            return {
                                ...review,
                                username: userData.username,
                            };
                        })
                    );

                    setReviews(reviewsWithUsernames);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [microwave_id]);

    const initializeReviews = (reviewData) => {
        const microwaveReviews = reviewData.map((review) => ({
            ...review,
        }));
        setReviews(microwaveReviews);
    };

    const handleAdd = async () => {
        window.location.href = `/new-review#${microwave_id}`;
    };

    const handleClose = async () => {
        window.location.href = `/dashboard`;
    };

    return (
        <div className="review-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h1>Microwave Reviews</h1>
                <h2>Location: {microwaveName}</h2>
                <h2>Description: {microwaveDescrip}</h2>
            </div>
            <Stack sx={{ pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                <Stack direction="row" spacing={4} justifyContent="center">
                    <Button component="label" variant="contained" onClick={() => handleAdd()} >
                        Add A Review?
                    </Button>
                    <Button type="submit" variant="contained" onClick={() => handleClose()} >
                        Return to Reviews
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={{ xs: 12, sm: 6, md: 4 }} sx={{ justifyContent: 'center' }}>
                    {reviews.map((review, index) => (
                        <Grid item key={index}>
                            <Card>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button startIcon={<StarRateIcon />}>
                                        {`${review.rating || 0} Stars`}
                                    </Button>
                                </CardActions>
                                <CardContent sx={{ display: 'block' }}>
                                    <div className="review-text">
                                        <p style={{ fontWeight: '700', textAlign: 'center' }}>{review.username} Wrote:</p>
                                        <p style={{ inlineSize: '350px', textAlign: 'center', paddingLeft: '0px' }}>{review.review}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default TestReviews;
