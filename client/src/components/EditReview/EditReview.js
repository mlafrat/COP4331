import './EditReview.css'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Rating from '../Rating/Rating';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import Cookies from 'js-cookie';


function EditReview(props) {

    const microwaveId = props.microwaveId;

    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const user_id = userData ? userData.user_id : null;

    const [formData, setFormData] = useState({
        review: '',
        rating: '',
        microwave_id: ''
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
/*
        const reviewData = new FormData();
        reviewData.append('review', formData.review);
        reviewData.append('rating', formData.rating);
        reviewData.append('microwave_id', props.microwaveId);
*/

        const updatedReview = {
            review: formData.review, 
            rating: formData.rating,
            microwave_id: props.microwaveId
        };


        try {
            console.log("on submit, microwave id is:", props.microwaveId); 
            //console.log("our form is: ", JSON.stringify(formData))
            console.log("our form is: ", JSON.stringify(updatedReview))

            const response = await fetch(`http://localhost:3001/changeReview/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedReview),
                //body: JSON.stringify(formData),
            });


            if (response.ok) {
                alert('Review updated successfully');

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
                    Testing, here is the microwave id: 
                    {`${microwaveId}`}
                </DialogContentText>
                <DialogContentText>
                    If you'd like to update your review, you can do so here!
                    <input
                        type="text"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                    />
                </DialogContentText>
                <DialogContentText>
                    Just for testing
                    <input
                        type="text"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </DialogContentText>                
                <Rating/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Update Review</Button>
            </DialogActions>
        </Dialog>
    );
    
}

export default EditReview;