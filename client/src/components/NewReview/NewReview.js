import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MicrowaveIcon from '@mui/icons-material/Microwave';

function NewReview() {
    const [formData, setFormData] = useState({
        review: '',
    });

    const [value, setValue] = useState(2);
    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const userId = userData ? userData.user_id : null;

    // Extracting microwave_id from URL hash
    const microwaveId = window.location.hash.substring(1);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/addReview', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    review: formData.review,
                    rating: value,
                    microwave_id: microwaveId,
                    user_id: userId,
                }),
            });

            if (response.ok) {
                // Redirect or perform any necessary actions upon successful submission
                window.location.href = `/test-reviews#${microwaveId}`;
            } else {
                // Handle errors if needed
                console.error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClose = () => {
        window.location.href = `/test-reviews#${microwaveId}`;
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
                    <Button onClick={handleClose}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}

export default NewReview;
