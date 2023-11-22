import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MicrowaveIcon from '@mui/icons-material/Microwave';

function NewReview() {

    const [value, setValue] = React.useState(2);

    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const userId = userData ? userData.user_id : null;

    console.log("receiving microwave id:");
    const microwave_id = window.location.hash.substring(1)
    console.log(microwave_id);   

    const [formData, setFormData] = useState({
        review: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

     const handleSubmit = async (event) => {
        event.preventDefault();

        const newWave = {
            review: formData.review,
            rating: value, 
            microwave_id: microwave_id,
            user_id: userId
        }

        console.log("new wave")
        console.log(newWave)

        try {

            //const response = await fetch(`http://localhost:3001/addReview/${userId}`, {
            const response = await fetch(`http://localhost:3001/addReview`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newWave),
            });

            if (response.ok) {
                window.location.href = `/test-reviews#${microwave_id}`;
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please try again.');
        }
    };


    const handleClose = async () => {
        window.location.href = `/test-reviews#${microwave_id}`;
    };    


    return (
        <div className="microwave-form-wrapper">
            <h1>New Review</h1>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <TextField
                        id="review"
                        label="Review"
                        multiline
                        rows={6}
                        placeholder="Leave your review here!"
                        type="text"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Button type="submit" variant="contained">
                        Submit Review
                    </Button>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}

export default NewReview;
