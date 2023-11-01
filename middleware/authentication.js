const {verifyToken} = require('../utils/jwt');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({error});
    }
};

module.exports = authentication;