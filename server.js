const express = require('express');
const cors = require('cors'); // Import cors module

const path = require('path');
const app = express();

app.use(cors()); // Use cors middleware

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

        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
          });


        // Define your routes here
        app.use('/login', require('./routes/login')(db));
        app.use('/register', require('./routes/register')(db));
        app.use('/changeSettings', require('./routes/changeSettings')(db));
        app.use('/addReview', require('./routes/addReview')(db));
        app.use('/addMicrowave', require('./routes/addMicrowave')(db));
        app.use('/handleGoogleLogin', require('./routes/google-login-handler')(db));
        app.use('/editProfile', require('./routes/editProfile')(db));
        app.use('/viewReviews', require('./routes/viewReviews')(db)); //reviews by user
        app.use('/editReview', require('./routes/editReview')(db));
        app.use('/deleteReview', require('./routes/deleteReview')(db));
        app.use('/getReview', require('./routes/getReview')(db));
        app.use('/getMicrowaveName', require('./routes/getMicrowaveName')(db));
        app.use('/getMicrowaveDescrip', require('./routes/getMicrowaveDescrip')(db));
        app.use('/viewMicrowaves', require('./routes/viewMicrowaves')(db));
        app.use('/getMicrowave', require('./routes/getMicrowave')(db));
        app.use('/viewMicrowaveReviews', require('./routes/viewMicrowaveReviews')(db)); //reviews by microwave
        app.use('/getUsernames', require('./routes/getUsernames')(db));
        app.get("/auth/google/callback",
            passport.authenticate("google", {
                successRedirect: "/handleGoogleLogin",
                failureRedirect: "/login"
            })
        );

        app.get("/success", (req, res) => {
            res.send("Success! You have logged in with Google.");
        });

        app.get('*',(req,res) => {
            res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
        })

        app.listen(3001, () => {
            console.log('Listening on port 3001...');
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });