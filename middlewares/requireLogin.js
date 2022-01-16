module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!'});
    }
    next();
};
//next is the next middleware in the middleware chain
