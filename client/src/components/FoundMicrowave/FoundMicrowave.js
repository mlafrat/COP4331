import React, { useState } from 'react';
import './FoundMicrowave.css';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Cookies from "js-cookie";


function FoundMicrowave() {

    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const userId = userData ? userData.user_id : null;

    //   const { creator_user_id, location } = req.body;

    const [formData, setFormData] = useState({
        location: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/addMicrowaveWithLocation/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Microwave added successfully');
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please try again.');
        }
    };



    return(
        <div className="microwave-form-wrapper">
            <h1>New Microwave</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="location-building"
                        label="Building Location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        id="location-description"
                        label="Location Description"
                        multiline
                        rows={6}
                        placeholder="Please provide a detailed description of where this microwave is located."
                    />
                </div>
                <div>
                    <Button component="label" variant="contained">
                            Upload a Photo of the Microwave Here!
                            <input type="file" accept="image/*" style={{ display: 'none' }}/>
                        </Button>
                    </div>
                <div>
                    <Button type="submit" variant="contained">Submit For Review</Button>
                </div>
            </form>
        </div>
      );

}

export default FoundMicrowave;