const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "1018313427845-pgdevcg100414ovlmscr8k9h5vktptfp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
}, (accessToken, refreshToken, profile, done) => {

    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
