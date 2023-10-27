const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import configurations
const passport = require('./config/passport-config');
const sessionMiddleware = require('./config/session-config');
const connectToMongo = require('./config/mongo-config');

// Use session middleware
app.use(sessionMiddleware);

// Initialize Passport
app.use(passport.initialize());

// Use Passport session management
app.use(passport.session());

let db;

connectToMongo()
    .then(database => {
        db = database;

        // Define your routes here
        app.use('/login', require('./routes/login')(db));
        app.use('/register', require('./routes/register')(db));

        app.get('/', (req, res) => {
            res.send('Hi there');
        });

        app.get("/auth/google/callback",
            passport.authenticate("google", {
                successRedirect: "/success",
                failureRedirect: "./routes/login"
            })
        );

        app.get("/success", (req, res) => {
            res.send("Success! You have logged in with Google.");
        });

        app.listen(3000, () => {
            console.log('Listening on port 3000...');
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });