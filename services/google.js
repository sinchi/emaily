const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport, keys, cb) => {
    passport.use(new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        cb
    )
    );
}