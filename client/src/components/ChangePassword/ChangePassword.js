import React, { useState } from 'react';
import "./ChangePassword.css";
import Button from "@material-ui/core/Button";
import { Container, Box, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useHistory } from 'react-router-dom';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    const userId = userData ? userData.user_id : null;
    const history = useHistory();

    const handleChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/editProfile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to change password');
            }

            setSuccessMessage('Password changed successfully');
            setError('');
            // Reset password fields
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            setError('Failed to change password');
            console.error(error);
        }
    };

    const handleCancel = () => {
        history.push('/profile-settings'); // Redirect to change settings page
    };

    return (
        <Container maxWidth="sm">
            <h1>Change Password</h1>
            <Box
                component="form"
                onSubmit={handleChange}
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <TextField
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                />
                <TextField
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                />
                <Button type="submit" variant="contained">
                    Change Password
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </Box>
        </Container>
    );
}

export default ChangePassword;
