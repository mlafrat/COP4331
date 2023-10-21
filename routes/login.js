// login.js
const express = require("express");
const router = express.Router();

// Fake user data for demonstration
const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
];

router.get("/", (req, res) => {
    res.send("Login Page");
});

router.post("/", (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the fake user data
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        // Maybe set a session or token to keep the user logged in??
        // For simplicity, we'll just send a success message.
        res.send("Login successful!");
    } else {
        res.status(401).send("Login failed. Invalid credentials.");
    }
});

module.exports = router;
