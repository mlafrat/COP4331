import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";

export default function SignUp({ setToken }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic password matching validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
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
        setToken(data.token);
        // Redirect to the dashboard
        history.push("/dashboard");
      } else {
        console.log(await response.text());
      }
    } else {
      console.error("Error:", response.statusText);
    }
    // You can handle form submission here (e.g., send data to the server).
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="signup-wrapper">
      <h1>Please Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
