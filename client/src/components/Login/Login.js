import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Cookies from "js-cookie";
import { Box, Container, Link, Grid, Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Login({ setToken }) {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        // login method information
        const userDataWithLoginMethod = {
          ...data.user,
          loginMethod: "local", // 'local' indicates login with username and password
        };

        setToken(data.token);

        // Save user data in a cookie
        Cookies.set("user", JSON.stringify(userDataWithLoginMethod), {
          expires: 7,
        }); // Expires in 7 days
        console.log(userDataWithLoginMethod);
        history.push("/dashboard");
      } else if (response.status === 401) {
        setError("Incorrect username or password");
      } else {
        console.error("Error:", response.statusText);
      }
    } else {
      setError("Incorrect username or password");
      console.error(error);
    }
  };


  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
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
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            value={formData.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
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
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 1 }}
            href="/auth/google/callback"
          >
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register here"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
      )}
    </Container>
  );
}
