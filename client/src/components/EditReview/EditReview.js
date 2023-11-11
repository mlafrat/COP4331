import './EditReview.css'
import React from 'react';
import Button from '@mui/material/Button';
import Rating from '../Rating/Rating';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';


function EditReview(props) {

    const {onClose} = props; 
  
    const handleClose = () => { 
        onClose(); 
    }; 
  
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    If you'd like to update your review, you can do so here!
                </DialogContentText>
                <Rating/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClose}>Update Review</Button>
            </DialogActions>
        </Dialog>
    );
    
}

export default EditReview;