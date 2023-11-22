import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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


//to-do: add something that doesn't let you add another review if you've already rated the wave

    return(
        <div className="review-wrapper">
            <h2>Microwave Reviews</h2>
            <h2>Location: {microwaveName}</h2>
            <h2>Description: {microwaveDescrip}</h2>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={{ xs: 12, sm: 6, md: 4 }}>
                    {reviews.map((review, index) => (
                        <Grid item key={index}>
                            <Card>
                                <CardContent>
                                    <div className="review-text">
                                        <p>{review.review}</p>
                                    </div>
                                    <div className="review-text">
                                        <p>Rating:</p>
                                        <p>{review.rating}</p>
                                    </div>                                    
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Button onClick={() => handleAdd()}>Add a review?</Button>
            <Button onClick={() => handleClose()}>Go back</Button>
        </div>

        );
    }
    
export default TestReviews;
