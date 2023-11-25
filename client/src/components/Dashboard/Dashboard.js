import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './Dashboard.css';
import Map from '../Map/Map';


function Dashboard() {
    const [microwaves, setMicrowaves] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

    const initializeMicrowaves = (microwaveData) => {
        const microwaves = microwaveData.map((microwave) => ({
            ...microwave,
        }));
        setMicrowaves(microwaves);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch call to get all microwaves
                const response = await fetch(`${apiUrl}/viewMicrowaves`);
                const data = await response.json();
                initializeMicrowaves(data.microwaves);
            } catch (error) {
                console.error('Error fetching microwaves:', error);
            }
        };
        fetchData();
    }, []);

    // switch to another page with reviews for this microwave
    const handleView = async (microwaveId) => {
        try {
            window.location.href = `/test-reviews#${microwaveId}`;
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    return (
        <div className="review-wrapper">
            <h2 style={{ padding: '10px' }}>Microwaves</h2>
            <Box sx={{ flexGrow: 1, display:'flex', flexDirection:'row' }}>
                <Map/>
                <Grid
                    container
                    spacing={3}
                    columns={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ display: 'block', flexDirection: 'column', padding: '10px', paddingRight: '20px', overflowX: 'hidden' }}
                >
                    {microwaves.map((microwave, index) => (
                        <Grid item key={index} sx={{ paddingRight: '20px', maxWidth: '780px' }}>
                            <Card sx={{ textAlign: 'center', width: '100%' }}>
                                <CardContent sx={{ textAlign:'center'}}>
                                    <div className="subtitle">
                                        <p style={{ fontWeight: '700', textAlign: 'center' }}>Microwave Location: </p>
                                        <p style={{textAlign: 'center', inlineSize:'100%'}}>
                                            {microwave.location_building}
                                        </p>
                                    </div>
                                    <div className="subtitle">
                                        <p style={{ fontWeight: '700', textAlign: 'center' }}>Location Description: </p>
                                        <p style={{ textAlign: 'center', inlineSize:'100%'}}>
                                            {microwave.location_description}
                                        </p>
                                    </div>
                                    <div className="subtitle">
                                        <p style={{ fontWeight: '700', textAlign: 'center' }}>Rating: </p>
                                        <p style={{ textAlign: 'center', inlineSize:'100%' }}>
                                            {microwave.users_rated !== 0
                                                ? (microwave.total_rating / microwave.users_rated).toFixed(1) // Rounded to one decimal place
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={() => handleView(microwave.microwave_id)}>
                                        View Reviews
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Dashboard;
