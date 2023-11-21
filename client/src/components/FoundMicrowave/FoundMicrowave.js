import React, { useState, useEffect } from "react";
import "./FoundMicrowave.css";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";
import { Container, Box, TextField, Grid, Stack } from "@mui/material";

function FoundMicrowave() {
  const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const userId = userData ? userData.user_id : null;

  const [formData, setFormData] = useState({
    location_building: "",
    location_description: "",
    gps_lat: null,
    gps_long: null,
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

    try {
      const response = await fetch(
        `http://localhost:3001/addMicrowave/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Microwave added successfully");
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1>Found a New Microwave?</h1>
        <TextField
          margin="small"
          id="location-building"
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
          label="Building Location"
          placeholder="Which building is this microwave in?"
          type="text"
          name="location_building"
          value={formData.location_building}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
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
        <Stack
          sx={{ pt: 2 }}
          direction="row"
          spacing={4}
          justifyContent="center"
        >
          <Button component="label" variant="contained">
            Upload Photo Here!
            <input type="file" accept="image/*" style={{ display: "none" }} />
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            Submit For Review
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default FoundMicrowave;
