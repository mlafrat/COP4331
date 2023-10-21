// register.js
const express = require("express");
const router = express.Router();

// Fake user data for demonstration
let users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
];

router.get("/", (req, res) => {
    res.send("Registration Page");
});

router.post("/", (req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        res.status(409).send("Username already exists.");
    } else {
        users.push({ username, password }); // Add the new user to the fake user data
        res.send("Registration successful!");
        console.log(users);
    }
});

module.exports = router;
