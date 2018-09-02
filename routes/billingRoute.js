const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
    app.post('/api/stripe', requireLogin, (req, res) => {
        const card = req.body;    
        stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: card.id
        })
        .then(charge => {
            req.user.credits += 5;
            req.user.save()
            .then(newUser => res.send(newUser));            
        });        
    });
}