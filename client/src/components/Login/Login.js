import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Cookies from "js-cookie";
import { Box, Container, Link, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Login({ setToken }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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

    const response = await fetch("http://localhost:3001/login", {
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
      } else {
        console.log(await response.text());
      }
    } else {
      console.error("Error:", response.statusText);
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
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
          <TextField
            margin="normal"
            required
            fullWidth
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
            variant="outlined"
            href="http://localhost:3001/auth/google/callback"
          >
            Sign In With Google
          </Button>
          <Grid Container>
            <Grid item xs>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register here"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
          <a href="http://localhost:3001/auth/google/callback">
            Login with Google
          </a>
        </form>

        <div className="register-button">
          <button onClick={() => history.push("/register")}>Register</button>
        </div>
      </div> */}
    </Container>
  );
}
