import React, { useState, useEffect } from "react";
import "./FoundMicrowave.css";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";

function FoundMicrowave() {
  const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const userId = userData ? userData.user_id : null;

  const [formData, setFormData] = useState({
    location_building: "",
    location_description: "",
    gps_lat: null,
    gps_long: null,
  });
}

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
      <h1>Have a new microwave?</h1>
      <TextField
        margin="small"
        id="location-building"
        fullWidth
        label="Building Location"
        placeholder="Tell us what building this microwave is located in"
        type="text"
        name="location_building"
        value={formData.location_building}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="location-description"
        label="Location Description"
        multiline
        rows={6}
        placeholder="Please provide a detailed description of where this microwave is located"
        type="text"
        name="location_description"
        value={formData.location_description}
        onChange={handleChange}
      />
      <Grid container>
        <Grid item xs>
          <Button component="label" variant="contained">
            Upload Photo Here!
            <input type="file" accept="image/*" style={{ display: "none" }} />
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="secondary">
            Submit For Review
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default FoundMicrowave;
