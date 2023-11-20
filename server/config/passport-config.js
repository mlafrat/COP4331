const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "798919910451-nigbdkijb3bbhu8qnri3lhm8s3rcp1p9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
}, (accessToken, refreshToken, profile, done) => {

    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
