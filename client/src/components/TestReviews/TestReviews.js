import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function TestReviews() {

    console.log("getting silly");
    const microwave_id = window.location.hash.substring(1)
    console.log(microwave_id);


    const handleAdd = async () => {
        window.location.href = `/new-review#${microwave_id}`;
    };    


    const handleClose = async () => {
        window.location.href = `/dashboard`;
    };    


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

    const fetchName = async () => {
        try {
            console.log("sanity check!")
            const response = await fetch(`http://localhost:3001/getMicrowaveName?microwave_id=${microwave_id}`);
            const data = await response.json();
            console.log("fetching a name...")
            console.log(data)

            setMicrowaveName((microwaveName) => (
                data.microwave_name));
            console.log(microwaveName)

        } catch (error) {
            console.error('Error fetching microwave name:', error);
    }}; 

    const fetchDescrip = async () => {
        try {
            console.log("sanity check #2!")
            const response = await fetch(`http://localhost:3001/getMicrowaveDescrip?microwave_id=${microwave_id}`);
            const data = await response.json();
            console.log("fetching a description...")
            console.log(data)

            setMicrowaveDescrip((microwaveDescrip) => (
                data.microwave_descrip));
            console.log(microwaveDescrip)

        } catch (error) {
            console.error('Error fetching microwave name:', error);
    }};    


//to-do: add an 'if' that doesn't let you add another review. like replace the 'add review button'

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
