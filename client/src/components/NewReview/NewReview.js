import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import "./NewReview.css";
import { Container, Box, Stack } from "@mui/material";



function NewReview() {
    //get rating
    const [value, setValue] = React.useState(2);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

    //get user id
    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const userId = userData ? userData.user_id : null;

    //get microwave id
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

        //define new review to send
        const newWave = {
            review: formData.review,
            rating: value,
            microwave_id: microwave_id,
            user_id: userId
        }

        try {
            const response = await fetch(`${apiUrl}/addReview`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newWave),
            });

            if (response.ok) {
                //return to previous page
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

    //return to previous page
    const handleClose = async () => {
        window.location.href = `/test-reviews#${microwave_id}`;
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <div>
                    <h1>New Review</h1>
                </div>
                <div>
                    <Rating
                        name="star-rating"
                        sx={{position:"relative"}}
                        value={value}

                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        icon={<MicrowaveIcon fontSize="inherit" sx={{color:"black", alignItems:"center", position:"relative"}} />}
                        emptyIcon={<MicrowaveIcon fontSize="inherit" />}
                    />
                </div>
                <Typography component="legend">1 Star = Terrible, 5 Stars = Knightrolicious</Typography>
                <div>
                    <TextField
                        id="review"
                        label="Review"
                        multiline
                        margin="normal"
                        required
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black"
                            },
                            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black"
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black"
                            },
                            "& .MuiOutlinedInput-input": {
                                color: "black"
                            },
                            "&:hover .MuiOutlinedInput-input": {
                                color: "black"
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                                backgroundColor: "white",
                                color: "black"
                            },
                            "& .MuiInputLabel-outlined": {
                                color: "black"
                            },
                            "&:hover .MuiInputLabel-outlined": {
                                color: "black"
                            },
                            "& .MuiInputLabel-outlined.Mui-focused": {
                                color: "black"
                            }
                        }}
                        rows={6}
                        placeholder="Leave your review here!"
                        type="text"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Stack sx={{ pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Stack direction="row" spacing={4} justifyContent="center">
                            <div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 1, position:"absolute" }}>
                                    Submit Review
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={() => handleClose()}
                                    variant="contained" fullWidth
                                    margin="normal"
                                    sx={{ mt: 3, mb: 2, position:"absolute" }}>Cancel
                                </Button>
                            </div>
                        </Stack>
                    </Stack>
                </div>
            </Box>
        </Container>


    );
}

export default NewReview;


