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
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }, (err, user) => {
            if(!err) {
                if(!user) {
                    new User({ googleId: profile.id, name: profile.displayName }).save()
                    .then(newUser => {
                        done(null, newUser);
                    });                    
                } else {
                    console.log('User is already exist: ' + user);
                    done(null, user);
                }
            } else {
                console.log('Error ' + err);
                done(err, null);
            }
        });        
    }
);


 /* const existingUser = await User.findOne({ googleId: profile.id });
       if(existingUser) {
          return done(null, existingUser);
       }
       const newUser = await new User({ googleId: profile.id, name: profile.displayName }).save();
       done(null, newUser);*/