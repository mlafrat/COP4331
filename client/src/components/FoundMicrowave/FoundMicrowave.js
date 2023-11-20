import React, { useState, useEffect } from 'react';
import './FoundMicrowave.css';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';

function FoundMicrowave() {
    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const userId = userData ? userData.user_id : null;

    const [formData, setFormData] = useState({
        location_building: '',
        location_description: '',
        gps_lat: null,
        gps_long: null,
    });

    const [microwaveImage, setMicrowaveImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMicrowaveImage(file);
    };

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData((prevData) => ({
                        ...prevData,
                        gps_lat: position.coords.latitude,
                        gps_long: position.coords.longitude,
                    }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataWithImage = new FormData();
        formDataWithImage.append('location_building', formData.location_building);
        formDataWithImage.append('location_description', formData.location_description);
        formDataWithImage.append('gps_lat', formData.gps_lat);
        formDataWithImage.append('gps_long', formData.gps_long);
        if (microwaveImage) {
            formDataWithImage.append('microwaveImage', microwaveImage);
        }

        try {
            const response = await fetch(`http://localhost:3001/addMicrowave/${userId}`, {
                method: 'PUT',
                body: formDataWithImage,
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

    return (
        <div className="microwave-form-wrapper">
            <h1>New Microwave</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="location-building"
                        label="Building Location"
                        type="text"
                        name="location_building"
                        value={formData.location_building}
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
                        type="text"
                        name="location_description"
                        value={formData.location_description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <Button component="label" variant="contained">
                        Upload Microwave Image
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </Button>
                </div>
                <div>
                    <Button type="submit" variant="contained">
                        Submit For Review
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FoundMicrowave;
