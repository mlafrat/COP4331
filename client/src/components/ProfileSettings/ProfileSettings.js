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

    const [profilePic, setProfilePic] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        // Assuming you want to handle a single file upload
        const file = e.target.files[0];
        setProfilePic(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataWithProfilePic = new FormData();
        formDataWithProfilePic.append('email', formData.email);
        formDataWithProfilePic.append('username', formData.username);
        if (profilePic) {
            formDataWithProfilePic.append('profilePic', profilePic);
        }

        try {
            const response = await fetch(`http://localhost:3001/editProfile/${userId}`, {
                method: 'PUT',
                body: formDataWithProfilePic,
            });

            if (response.ok) {
                const updatedUserData = await response.json();

                setFormData({
                    email: updatedUserData.email,
                    username: updatedUserData.username,
                });

                setProfilePic(updatedUserData.profilePicUrl);

                alert('Profile updated successfully. Please log in again for changes to take effect.');
                window.location.href = '/';

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
                    <Button component="label" variant="contained">
                        Change Profile Picture
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </Button>
                </div>
                <div>
                    <Button type="submit" variant="contained">Update Credentials</Button>
                </div>
                <a href="http://localhost:3000/change-password">Change Password</a>
            </form>
        </div>
    );
}

export default ProfileSettings;