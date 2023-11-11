import './Reviews.css'
import React from 'react';
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
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div class="review-wrapper">
            <h2>My Reviews</h2>   
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{md: 3}} columns={{md: 12}}>
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid item md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <div class='.MuiCardContent-root'>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                Building Location
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                Microwave Location Title (like HS1 2nd Floor)
                                            </Typography>
                                            <Typography variant="body2">
                                                Review can go here.
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" startIcon={<StarRateIcon />} onClick={handleClickOpen}>
                                             X Stars-reviewer's rating
                                        </Button>
                                        <EditReview
                                            open={open} 
                                            onClose={handleClose} 
                                        /> 
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
