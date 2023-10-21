// index.js
const express = require("express");
const app = express();
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

app.use(express.json());

app.get("/", (request, response) => {
    response.send("Hi there");
});

// Use the login and register routers
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.get("/getlocation", (request, response) => {
    response.sendFile(__dirname + "/html/location.html");
});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});
