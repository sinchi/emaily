const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./models/User');
require('./services/passport');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURL, {useNewUrlParser: true});
require('./routes/authRoute')(app);
require('./routes/billingRoute')(app);

// if we are in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname ,'client', 'build', 'index.html'));
    });
}

app.get("/api/test", (req, res) => {
    res.send({msg: 'Hello Heroku' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);