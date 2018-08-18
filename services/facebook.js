const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport, keys, cb) => {
    passport.use(new FacebookStrategy({
        clientID: keys.facebookAppID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: "/auth/facebook/callback"
      },
      cb
    ));
}