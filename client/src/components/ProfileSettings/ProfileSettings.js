import React, { useState } from 'react';
import './ProfileSettings.css';
import Button from '@material-ui/core/Button';
import Cookies from "js-cookie";

function ProfileSettings() {
    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const userId = userData ? userData.user_id : null;

    const [formData, setFormData] = useState({
        email: '',
        username: ''
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
            const response = await fetch(`http://localhost:3001/editProfile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Profile updated successfully');
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
        <div className="settings-wrapper">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <p>Username</p>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <div>
                    <Button type="submit" variant="contained">Update Credentials</Button>
                </div>
                <div>
                    <Button component="label" variant="contained">
                        Change Profile Picture
                        <input type="file" accept="image/*" style={{ display: 'none' }}/>
                    </Button>
                </div>
                <a href="http://localhost:3000/change-password">Change Password</a>
            </form>
        </div>
    );
}

export default ProfileSettings;
