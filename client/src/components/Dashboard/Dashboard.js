import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Dashboard() {

    const [microwaves, setMicrowaves] = useState([]);

    const initializeMicrowaves = (microwaveData) => {
        const microwavesWithFlags = microwaveData.map((microwave) => ({
            ...microwave, isViewing: false,
        }));
        setMicrowaves(microwavesWithFlags);
    };

    const handleView = async (microwaveId, index) => {
        try {
            window.location.href = `/test-reviews#${microwaveId}`;

        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
              try {
                  // Fetch call to get all microwaves
                  const response = await fetch(`http://localhost:3001/viewMicrowaves`);
                  const data = await response.json();
                  initializeMicrowaves(data.microwaves);
              } catch (error) {
                  console.error('Error fetching microwaves:', error);
              }
        };
        fetchData();
    }, []);


  return(
    <div className="review-wrapper">
        <h2>Microwaves!</h2>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} columns={{ xs: 12, sm: 6, md: 4 }}>
                {microwaves.map((microwave, index) => (
                    <Grid item key={index}>
                        <Card>
                            <CardContent>
                                <div className="subtitle">
                                    Microwave Location: {microwave.location_building}
                                </div>
                                <div className="subtitle">
                                    Location Description: {microwave.location_description}
                                </div>
                                <div className="subtitle">
                                    Rating: {microwave.total_rating/microwave.users_rated}
                                </div>                                    
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleView(microwave.microwave_id, index)}>View Reviews</Button>
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
