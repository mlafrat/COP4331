import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import "./Register.css";

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            history.push("/dashboard"); // Redirect to the dashboard
        } else {
            alert(data); // Error message from the server
        }
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
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="login-button">
                <button onClick={() => history.push('/login')}>Login</button>
            </div>
        </div>
    );
}
