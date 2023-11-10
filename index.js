const express = require('express');
const cors = require('cors'); // Import cors module

const app = express();

app.use(cors()); // Use cors middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import configurations
const passport = require('./server/config/passport-config');
const sessionMiddleware = require('./server/config/session-config');
const connectToMongo = require('./server/config/mongo-config');

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
        app.use('/login', require('./server/routes/login')(db));
        app.use('/register', require('./server/routes/register')(db));
        app.use('/changeSettings', require('./server/routes/changeSettings')(db));
        app.use('/addReview', require('./server/routes/addReview')(db));
        app.use('/changeReview', require('./server/routes/changeReview')(db));
        app.use('/addMicrowave', require('./server/routes/addMicrowave')(db));
        app.use( '/handleGoogleLogin', require('./server/routes/google-login-handler')(db));
        app.use('/editProfile', require('./server/routes/editProfile')(db));


        app.get('/', (req, res) => {
            res.send('Hi there');
        });

        app.get("/auth/google/callback",
            passport.authenticate("google", {
                successRedirect: "/handleGoogleLogin",
                failureRedirect: "/login"
            })
        );

        app.get("/success", (req, res) => {
            res.send("Success! You have logged in with Google.");
        });

        app.listen(3001, () => {
            console.log('Listening on port 3001...');
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });