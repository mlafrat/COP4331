import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Cookies from 'js-cookie';

export default function Login({ setToken }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setToken(data.token);

                // Save user data in a cookie
                Cookies.set('user', JSON.stringify(data.user), { expires: 7 }); // Expires in 7 days

                history.push('/dashboard');
            } else {
                console.log(await response.text());
            }
        } else {
            console.error('Error:', response.statusText);
        }
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
                <a href="http://localhost:3001/auth/google/callback">Login with Google</a>
            </form>

            <div className="register-button">
                <button onClick={() => history.push('/register')}>Register</button>
            </div>
        </div>
    );
}
