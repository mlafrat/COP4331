import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Box, Stack } from "@mui/material";
import './TestReviews.css';

function TestReviews() {

    //get microwave id
    const microwave_id = window.location.hash.substring(1)
    console.log("viewing microwave:");
    console.log(microwave_id);

    //review stuff
    const [reviews, setReviews] = useState([]);

    const initializeReviews = (reviewData) => {
        const microwaveReviews= reviewData.map((review) => ({
            ...review,
        }));
        setReviews(microwaveReviews);
    };

    useEffect(() => {
        const fetchData = async () => {

            if (microwave_id) {
                try {
                    // Fetch call to get reviews by microwave ID
                    const response = await fetch(`http://localhost:3001/viewMicrowaveReviews?microwave_id=${microwave_id}`);
                    const data = await response.json();
                    initializeReviews(data.reviews);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            }
        };

        fetchData();
    }, []);


    //microwave stuff
    const [microwaveName, setMicrowaveName] = useState();
    const [microwaveDescrip, setMicrowaveDescrip] = useState();
    useEffect(() => { 
        fetchName();
        fetchDescrip();
    })

    //fetch location and description to display
    const fetchName = async () => {
        try {
            const response = await fetch(`http://localhost:3001/getMicrowaveName?microwave_id=${microwave_id}`);
            const data = await response.json();

            setMicrowaveName((microwaveName) => (
                data.microwave_name));
        } catch (error) {
            console.error('Error fetching microwave name:', error);
    }}; 

    const fetchDescrip = async () => {
        try {
            const response = await fetch(`http://localhost:3001/getMicrowaveDescrip?microwave_id=${microwave_id}`);
            const data = await response.json();

            setMicrowaveDescrip((microwaveDescrip) => (
                data.microwave_descrip));
            console.log(microwaveDescrip)

        } catch (error) {
            console.error('Error fetching microwave name:', error);
    }};    


    //bring us to a new page with the form
    const handleAdd = async () => {
        window.location.href = `/new-review#${microwave_id}`;
    };    

    //return to dash
    const handleClose = async () => {
        window.location.href = `/dashboard`;
    };

    return (
        <div className="review-wrapper" style={{ maxHeight: '600px', overflowY: 'scroll' }}>
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
                                        <p style={{ fontWeight: '700', textAlign: 'center' }}>User Wrote: </p>
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