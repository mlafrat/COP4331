const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "798919910451-bapigtqppu7lb16s9rkcjp35gukpl1qk.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
}, (accessToken, refreshToken, profile, done) => {

    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
