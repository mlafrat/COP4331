import './EditReview.css'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
//import Rating from '../Rating/Rating'; //temporarily combined with this file (for testing purposes)
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import Cookies from 'js-cookie';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import TextField from '@mui/material/TextField';


function EditReview(props) {

    console.log("This is the microwave we're getting: ", props.thisMicrowave)
    const thisReview = props.thisMicrowave.review
    const thisRating = props.thisMicrowave.rating
    console.log("thisReview", thisReview)
    console.log("thisRating", thisRating)

    const [value, setValue] = React.useState(thisRating);

    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const user_id = userData ? userData.user_id : null;

    const [formData, setFormData] = useState({
        review: ''
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const updatedReview = {
            review: formData.review, 
            rating: value,
            microwave_id: props.microwaveId
        };


        try {
            console.log("our updated review is: ", JSON.stringify(updatedReview))

            const response = await fetch(`http://localhost:3001/changeReview/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedReview),
            });

            if (response.ok) {
                window.location.href = '/my-reviews';

            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please try again.');
        }
    }

    const {onClose} = props; 
  
    const handleClose = () => { 
        onClose(); 
    }; 

  
    return (
        <Dialog open={props.open} onClose={props.handleClose} >
            <DialogTitle>Edit Review</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If you'd like to update your review, you can do so here!
                </DialogContentText>    
                    <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                    >
                    <div>
                    <Typography component="legend">1 Star = Terrible, 5 Stars = Knightrolicious</Typography>
                    <Rating
                        name="star-rating"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        icon={<MicrowaveIcon fontSize="inherit" />}
                        emptyIcon={<MicrowaveIcon fontSize="inherit" />}
                    />
                    </div>
                    <TextField
                        id="my-review"
                        label="Update Review"
                        multiline
                        fullWidth
                        rows={4}
                        placeholder={thisReview}
                        type="text"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                    />
                    </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Update Review</Button>
            </DialogActions>
        </Dialog>
    );
    
}

export default EditReview;