const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user);
    });
});

/*require('./facebook')(passport, keys, 
    (accessToken, refreshToken, profile, cb) => {
        console.log('Access Token : ' + accessToken);
        console.log('Refresh Token : ' + refreshToken);
        console.log(profile);
    }
);*/

require('./google')(passport, keys, 
   async (accessToken, refreshToken, profile, done) => {
       const existingUser = await User.findOne({ googleId: profile.id });
       if(existingUser) {
          return done(null, existingUser);
       }
       const newUser = await new User({ googleId: profile.id, name: profile.displayName }).save();
       done(null, newUser);                
    }
);