module.exports = (req, user, next) => {
    if(!req.user) {
        return resizeBy.status(401).send({error: 'You must login!'});
    }
    next();
}