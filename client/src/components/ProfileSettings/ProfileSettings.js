import React, { useState } from "react";
import "./ProfileSettings.css";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";
import { Container, Box, TextField, Grid, Stack } from "@mui/material";

function ProfileSettings() {
  const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const userId = userData ? userData.user_id : null;

  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    formDataWithProfilePic.append("email", formData.email);
    formDataWithProfilePic.append("username", formData.username);
    if (profilePic) {
      formDataWithProfilePic.append("profilePic", profilePic);
    }

    try {
      const response = await fetch(
        `http://localhost:3001/editProfile/${userId}`,
        {
          method: "PUT",
          body: formDataWithProfilePic,
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();

        setFormData({
          email: updatedUserData.email,
          username: updatedUserData.username,
        });

        setProfilePic(updatedUserData.profilePicUrl);

        alert(
          "Profile updated successfully. Please log in again for changes to take effect."
        );
        window.location.href = "/";
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <h1>Edit Profile</h1>
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
        <TextField
          margin="normal"
          required
          fullWidth
          type="text"
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="email"
          value={formData.username}
          onChange={handleChange}
          autoFocus
        />
        <Box>
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={4}
            justifyContent="center"
          >
            <Button component="label" variant="contained" margin="normal">
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Button>

            <Button
              href="http://localhost:3000/change-password"
              variant="contained"
            >
              Change Password
            </Button>

            <Button type="submit" variant="contained" color="secondary">
              Update Credentials
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default ProfileSettings;
